import ListHeaderDropdown from "./ListHeaderDropdown";

function ListHeader() {
  return (
    <div className="flex items-center justify-between px-2">
      <h2 className="text-sm font-semibold">List Title</h2>

      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">3</span>

        <ListHeaderDropdown />
      </div>
    </div>
  );
}

export default ListHeader;
