import exported from "../config/modules";

type Modules = {
  [key in keyof typeof exported]: (typeof exported)[key]["value"];
};

function exportModules() {
  const modules = {} as Modules;
  for (const key in exported) {
    const exportedKey = key as keyof typeof exported;
    (modules as any)[exportedKey] = exported[exportedKey].value;
  }

  return modules;
}

const modules = exportModules();

export = modules;
