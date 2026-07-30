import { Link } from "react-router";
import { DrawerClose } from "@/components/ui/drawer";

function SwitchWorkboardItem({ item }: { item: number }) {
  return (
    <DrawerClose asChild>
      <Link to="/" className="rounded-md overflow-hidden relative">
        <img
          src="https://img.magnific.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg?semt=ais_hybrid&w=740&q=80"
          alt=""
          loading="lazy"
          className="w-full aspect-video object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/60 to-transparent flex flex-col justify-end p-3 font-medium">
          Workboard {item}
        </div>
      </Link>
    </DrawerClose>
  );
}

export default SwitchWorkboardItem;
