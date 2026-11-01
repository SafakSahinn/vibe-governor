import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wizard } from "@/components/wizard/Wizard";
import { UiLocaleProvider } from "@/components/wizard/UiLocale";
import { DEFAULT_FORM_DATA } from "@/lib/schema";

function setup() {
  const user = userEvent.setup();
  render(
    <UiLocaleProvider>
      <Wizard />
    </UiLocaleProvider>
  );
  const setUi = async (l: "TR" | "EN") => user.click(screen.getByRole("button", { name: l }));
  const next = async () => user.click(screen.getByRole("button", { name: /Sonraki Adım|Next Step/ }));
  return { user, setUi, next };
}

describe("Wizard UI", () => {
  it("blocks leaving step 3 when the project name is empty", async () => {
    const { user, setUi, next } = setup();
    await setUi("TR");
    await next();
    await next();
    expect(await screen.findByText("3. Memory Bank Formu (6 Çekirdek Dosya)")).toBeInTheDocument();
    await user.clear(screen.getByPlaceholderText("Örn: my-awesome-project"));
    await next();
    expect((await screen.findAllByText("Proje adı boş bırakılamaz.")).length).toBeGreaterThan(0);
    expect(screen.getByText("3. Memory Bank Formu (6 Çekirdek Dosya)")).toBeInTheDocument();
  });

  it("switches the interface language; output language follows until chosen in step 1", async () => {
    const { user, setUi } = setup();
    await setUi("EN");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Vibe Governor Web Wizard");
    expect(screen.getByRole("button", { name: /English \(EN\)/ })).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: /Türkçe \(TR\)/ }));
    await setUi("TR");
    await setUi("EN");
    expect(screen.getByRole("button", { name: /Türkçe \(TR\)/ })).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.lang).toBe("en");
  });

  it("allows a hardware-only project and a project without any language", async () => {
    const { user, setUi, next } = setup();
    await setUi("EN");
    await user.click(screen.getByRole("button", { name: "Hardware (HDL)" }));
    expect(screen.getByRole("button", { name: "Verilog" })).toHaveAttribute("aria-pressed", "true");
    for (const lang of ["TypeScript", "Python", "Rust"]) {
      expect(screen.getByRole("button", { name: lang })).toHaveAttribute("aria-pressed", "false");
    }
    expect(screen.getByRole("button", { name: "Hardware (HDL)" })).toHaveAttribute("aria-pressed", "true");

    // Deselecting the last language is allowed too.
    await user.click(screen.getByRole("button", { name: "Verilog" }));
    expect(screen.getByRole("button", { name: "No language" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/only language-independent rules apply/)).toBeInTheDocument();
    await next();
    expect(await screen.findByText("2. Architecture & Constraint Settings")).toBeInTheDocument();
  });

  it("loads an existing vibe-governor.json into the form", async () => {
    const { user, setUi } = setup();
    await setUi("EN");
    const config = {
      formatVersion: 1,
      generator: "vibe-governor@1.3.0",
      config: { ...DEFAULT_FORM_DATA, locale: "tr", languages: ["VHDL"], memoryBank: { ...DEFAULT_FORM_DATA.memoryBank, projectName: "Imported-HW" } },
      managedFiles: {},
    };
    const input = screen.getByTestId("config-input");
    await user.upload(input, new File([JSON.stringify(config)], "vibe-governor.json", { type: "application/json" }));
    expect(await screen.findByText(/Loaded vibe-governor\.json: settings of "Imported-HW"/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "VHDL" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "TypeScript" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: /Türkçe \(TR\)/ })).toHaveAttribute("aria-pressed", "true");

    await user.upload(input, new File(["{ not json"], "broken.json", { type: "application/json" }));
    expect(await screen.findByText("broken.json is not valid JSON.")).toBeInTheDocument();
  });

  it("platform cards are operable from the keyboard", async () => {
    const { user, setUi } = setup();
    await setUi("EN");
    const card = screen.getByRole("checkbox", { name: "Cursor (.cursor/rules/vibe-governor.mdc)" });
    expect(card).toHaveAttribute("aria-checked", "true");
    card.focus();
    await user.keyboard(" ");
    expect(card).toHaveAttribute("aria-checked", "false");
    await user.keyboard("{Enter}");
    expect(card).toHaveAttribute("aria-checked", "true");
  });

  it("safety switches toggle and new languages are offered", async () => {
    const { user, setUi, next } = setup();
    await setUi("EN");
    for (const lang of ["C", "C#", "Java", "JavaScript", "Kotlin", "Swift", "PHP"]) {
      expect(screen.getByRole("button", { name: lang })).toBeInTheDocument();
    }
    await user.click(screen.getByRole("button", { name: "Java" }));
    await next();
    const sw = await screen.findByRole("switch", { name: "Java: Exception Discipline" });
    expect(sw).toHaveAttribute("aria-checked", "true");
    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "false");
  });

  it("safety switches follow the language selection", async () => {
    const { user, setUi, next } = setup();
    await setUi("EN");
    // Defaults: TypeScript, Python, Rust are on; Go is not selected.
    await user.click(screen.getByRole("button", { name: "Go" }));
    await user.click(screen.getByRole("button", { name: "Rust" }));
    await next();
    expect(await screen.findByRole("switch", { name: "Go: Explicit Error Checks" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("switch", { name: "TypeScript: No `any` Type" })).toHaveAttribute("aria-checked", "true");
    const rust = screen.getByRole("switch", { name: "Rust: Ban unsafe Blocks" });
    expect(rust).toHaveAttribute("aria-checked", "false");
    expect(rust.closest("details")).not.toBeNull(); // tucked away with the other unselected languages

    // A switch turned off by hand stays off while its language stays selected.
    await user.click(screen.getByRole("switch", { name: "TypeScript: No `any` Type" }));
    await user.click(screen.getByRole("button", { name: /Back/ }));
    await user.click(screen.getByRole("button", { name: "Python" }));
    await next();
    expect(await screen.findByRole("switch", { name: "TypeScript: No `any` Type" })).toHaveAttribute("aria-checked", "false");
  });

  it("step 3 is pre-filled from earlier choices and keeps hand-edited text", async () => {
    const { user, setUi, next } = setup();
    await setUi("EN");
    await user.click(screen.getByRole("button", { name: "Verilog" }));
    await next();
    await next();
    await user.click(screen.getByRole("button", { name: /Tech Context/ }));
    const textarea = () => document.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea().value).toMatch(/Rust: `cargo build`/);
    expect(textarea().value).toMatch(/Verilog: `verilator --lint-only -Wall`/);
    expect(screen.getByText(/Filled in from your earlier choices/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Project Brief/ }));
    expect(textarea().value).toBe("Mixed project combining TypeScript, Python and Rust software with Verilog hardware design.");
    await user.type(textarea(), " Custom note.");
    expect(screen.getByText(/Edited by hand/)).toBeInTheDocument();

    // Changing languages updates untouched fields but keeps the edited one.
    await user.click(screen.getByRole("button", { name: /Back/ }));
    await user.click(screen.getByRole("button", { name: /Back/ }));
    await user.click(screen.getByRole("button", { name: "Python" }));
    await next();
    await next();
    await user.click(screen.getByRole("button", { name: /Project Brief/ }));
    expect(textarea().value).toMatch(/Custom note\.$/);
    await user.click(screen.getByRole("button", { name: /Tech Context/ }));
    expect(textarea().value).not.toMatch(/Python:/);

    // Product context cannot be derived.
    await user.click(screen.getByRole("button", { name: /Product Context/ }));
    expect(screen.getByText(/cannot be derived from the settings/)).toBeInTheDocument();
  });

  it("hook and CI depend on the checker script in step 4", async () => {
    const { user, setUi, next } = setup();
    await setUi("EN");
    await next();
    await next();
    await next();
    const checker = await screen.findByRole("checkbox", { name: /Static AI Guidelines Checker/ });
    const hook = screen.getByRole("checkbox", { name: /Pre-Commit Blocking Hook/ });
    const ci = screen.getByRole("checkbox", { name: /GitHub Actions CI\/CD/ });
    await user.click(checker);
    expect(checker).toHaveAttribute("aria-checked", "false");
    expect(hook).toHaveAttribute("aria-checked", "false");
    expect(ci).toHaveAttribute("aria-checked", "false");
    await user.click(hook);
    expect(hook).toHaveAttribute("aria-checked", "true");
    expect(checker).toHaveAttribute("aria-checked", "true");
  });

  it("step 5 shows the one-line command carrying the preset", async () => {
    const { setUi, next } = setup();
    await setUi("EN");
    for (let i = 0; i < 4; i++) await next();
    expect(await screen.findByText(/npx -y vibe-governor init --preset=[A-Za-z0-9_-]+/)).toBeInTheDocument();
  });

  it("opens the guide and closes it with Escape", async () => {
    const { user, setUi } = setup();
    await setUi("TR");
    await user.click(screen.getByRole("button", { name: "Rehber" }));
    const dialog = await screen.findByRole("dialog", { name: "Vibe Governor Rehberi" });
    expect(within(dialog).getAllByText("Denetçinin yakaladığı kurallar").length).toBeGreaterThan(0);
    expect(within(dialog).getByText("malloc NULL Kontrolü")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
