import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRoundPlus } from "lucide-react";

const PERMISSIONS = [
  { label: "Admin", value: "admin" },
  { label: "Read & write", value: "read_write" },
  { label: "Read", value: "read" },
];

function BoardInvite() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4" size="lg">
          <UserRoundPlus />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Invite to board</DialogTitle>
          <DialogDescription>Invite someone to board.</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <FieldGroup>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="jhondoe@domain.com"
              />
            </Field>
            <Field>
              <Label htmlFor="permission">Permission</Label>
              <Select name="permission" defaultValue="read">
                <SelectTrigger className="w-full" id="permission">
                  <SelectValue placeholder="Select permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PERMISSIONS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit">Invite</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BoardInvite;
