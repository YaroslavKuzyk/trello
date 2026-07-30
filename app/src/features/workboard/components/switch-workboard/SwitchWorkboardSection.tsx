import SwitchWorkboardItem from "@/features/workboard/components/switch-workboard/SwitchWorkboardItem";

function SwitchWorkboardSection({
  title,
  boards,
}: {
  title: string;
  boards: number[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-medium">{title}</h4>
      <div className="grid grid-cols-4 gap-4">
        {boards.map((item) => (
          <SwitchWorkboardItem key={item} item={item} />
        ))}
      </div>
    </div>
  );
}

export default SwitchWorkboardSection;
