import { type ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";

import type { ShipOverview } from "@/types/Ship";
import { getShipThumbnail, replaceAndSanitizeText } from "@/lib/utils";

export const columns: ColumnDef<ShipOverview>[] = [
  {
    accessorKey: "id",
    header: "Ship ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const shipId = String(row.getValue("id"));
      const shipName = String(row.getValue("name"));
      const shipIcon = getShipThumbnail(shipId);

      return (
        <div className="flex items-center gap-1">
          <img
            className="w-14 h-14 lazyload"
            loading="lazy"
            data-src={`/${shipIcon}`}
            alt={shipName}
          />
          <span>{shipName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "colaCount",
    header: "Cola Needed",
    cell: ({ row }) => {
      const count = parseInt(row.getValue("colaCount"));
      const formatted = new Intl.NumberFormat("en-US").format(count);
      return formatted;
    },
  },
  {
    accessorKey: "superColaCount",
    header: "Super Cola Needed",
  },
  {
    accessorKey: "effect",
    header: "Maxed Effect",
    enableSorting: false,
    cell: ({ row }) => {
      const effectText = String(row.getValue("effect"));
      // if needed, sanitize the val with js-xss or dompurify
      const text = replaceAndSanitizeText(effectText);
      return <p dangerouslySetInnerHTML={{ __html: text }}></p>;
    },
  },
  {
    accessorKey: "hasSpecial",
    header: "Special",
    cell: ({ row }) => {
      const shipId = Boolean(row.getValue("hasSpecial"));
      return (
        <div className="flex justify-center">
          {shipId ? <Check size={16} /> : "-"}
        </div>
      );
    },
  },
];
