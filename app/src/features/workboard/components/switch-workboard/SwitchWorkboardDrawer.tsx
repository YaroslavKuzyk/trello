import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SwitchWorkboardSection from "@/features/workboard/components/switch-workboard/SwitchWorkboardSection";

const SECTIONS = ["Favorites", "Recents", "Work place"];

function SwitchWorkboardDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Switch workboard</Button>
      </DrawerTrigger>
      <DrawerContent
        className="max-w-248 mx-auto overflow-hidden"
        aria-describedby={undefined}
      >
        <DrawerHeader className="shrink-0">
          <DrawerTitle className="text-xl text-center">
            Switch workboard
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <div className="flex shrink-0 items-center gap-2 rounded-md p-2 text-accent-foreground">
            <Input placeholder="Search workboard" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pt-4">
            {SECTIONS.map((title) => (
              <SwitchWorkboardSection
                key={title}
                title={title}
                boards={Array.from({ length: 4 }, (_, i) => i + 1)}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SwitchWorkboardDrawer;
