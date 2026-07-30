import { useRef, useState } from "react";

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type Material = {
  id: string;
  name: string;
  meta: string;
  type: "file" | "link";
};

export type TaskCardDraft = ReturnType<typeof useTaskCardDraft>;

const INITIAL_CONTENT =
  "Collect the current board screens, mark what changes and hand the spec over to the team.";

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: "collect", label: "Collect references", done: true },
  { id: "wireframe", label: "Sketch the wireframe", done: false },
  { id: "review", label: "Review with the team", done: false },
];

const INITIAL_MATERIALS: Material[] = [
  {
    id: "spec",
    name: "design-spec.pdf",
    meta: "PDF · 240 KB · added 20 July",
    type: "file",
  },
  {
    id: "figma",
    name: "Figma — Board redesign",
    meta: "figma.com · added 21 July",
    type: "link",
  },
];

const ALTERNATIVE_COVER =
  "https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?w=640&q=80";

type UseTaskCardDraftOptions = {
  title: string;
  coverUrl?: string;
};

export function useTaskCardDraft({ title, coverUrl }: UseTaskCardDraftOptions) {
  const [cardTitle, setTitle] = useState(title);
  const [cover, setCover] = useState(coverUrl);
  const [done, setDone] = useState(false);
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [assignee, setAssignee] = useState("shadcn");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState<string[]>(["design"]);

  const lastId = useRef(0);
  const [syncedProps, setSyncedProps] = useState({ title, coverUrl });
  if (syncedProps.title !== title || syncedProps.coverUrl !== coverUrl) {
    setSyncedProps({ title, coverUrl });
    setTitle(title);
    setCover(coverUrl);
  }

  function createId(prefix: string) {
    lastId.current += 1;
    return `${prefix}-${lastId.current}`;
  }

  function toggleChecklistItem(id: string, itemDone: boolean) {
    setChecklist((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: itemDone } : item,
      ),
    );
  }

  function removeChecklistItem(id: string) {
    setChecklist((current) => current.filter((item) => item.id !== id));
  }

  function addChecklistItem(label: string) {
    setChecklist((current) => [
      ...current,
      { id: createId("item"), label, done: false },
    ]);
  }

  function removeMaterial(id: string) {
    setMaterials((current) => current.filter((item) => item.id !== id));
  }

  function addMaterial(name: string) {
    setMaterials((current) => [
      ...current,
      {
        id: createId("material"),
        name,
        meta: "link · added just now",
        type: "link",
      },
    ]);
  }

  function toggleTag(value: string, checked: boolean) {
    setTags((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    );
  }

  function changeCover() {
    setCover((current) =>
      current === ALTERNATIVE_COVER ? coverUrl : ALTERNATIVE_COVER,
    );
  }

  return {
    title: cardTitle,
    setTitle,
    cover,
    changeCover,
    removeCover: () => setCover(undefined),
    done,
    setDone,
    content,
    setContent,
    checklist,
    toggleChecklistItem,
    removeChecklistItem,
    addChecklistItem,
    materials,
    removeMaterial,
    addMaterial,
    assignee,
    setAssignee,
    startDate,
    setStartDate,
    dueDate,
    setDueDate,
    tags,
    toggleTag,
  };
}
