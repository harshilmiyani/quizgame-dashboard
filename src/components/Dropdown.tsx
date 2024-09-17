import * as React from "react";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface DropdownMenuComponentProps {
  title: string;
  options: { id: string; title: string; checked: boolean }[];
  onSelectOption: (checked: boolean, id: string) => void;
}

const Dropdown: React.FC<DropdownMenuComponentProps> = ({
  options,
  title,
  onSelectOption,
}) => {
  const selectedItem = options.find((i) => i.checked);
  return (
    <DropdownMenu>
      {!!title && <p className="mb-2">{title}</p>}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-2 border-gray-300 rounded-md py-6 px-8 text-[16px] w-64"
        >
          {selectedItem?.title || title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((item) => (
          <DropdownMenuCheckboxItem
            key={`DropdownMenuCheckboxItem-${item.title}`}
            checked={item.checked}
            onCheckedChange={(checked) => onSelectOption(checked, item.id)}
          >
            {item.title}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
