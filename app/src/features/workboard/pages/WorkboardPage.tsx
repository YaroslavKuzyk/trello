import EditableWorkboardName from "@/features/workboard/components/EditableWorkboardName";
import { useParams } from "react-router";

function WorkboardPage() {
  const { workboardId } = useParams();

  return (
    <div>
      <div className="p-3 bg-card">
        <EditableWorkboardName />
      </div>
      <div>
        <p>Workboard ID: {workboardId ? workboardId : "New Workboard"}</p>
      </div>
    </div>
  );
}

export default WorkboardPage;
