'use client';

import { getSongs, type Song } from "@/api/song";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Loader } from "lucide-react";
import { useEffect, useState } from "react";


export default function SongsPage() {

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "bpm",
      header: "Bpm",
      cell: ({ row }: {row: any}) => {
        const { status, local_song_features } = row.original;
        if ( status === "processed" ) {
          return local_song_features.bpm
        } else {
          return <span className="text-gray-300"> --- </span>
        }
      }
    },
    {
      accessorKey: "aggressive",
      header: "Aggressive",
      cell: ({ row }: {row: any}) => {
        const { status, local_song_features } = row.original;
        if ( status === "processed" ) {
          return local_song_features.aggressive + " %"
        } else {
          return <span className="text-gray-300"> --- </span>
        }
      }
    },
    {
      accessorKey: "happy",
      header: "Happy",
      cell: ({ row }: {row: any}) => {
        const { status, local_song_features } = row.original;
        if ( status === "processed" ) {
          return local_song_features.happy + " %"
        } else {
          return <span className="text-gray-300"> --- </span>
        }
      }
    },
    {
      accessorKey: "sad",
      header: "Sad",
      cell: ({ row }: {row: any}) => {
        const { status, local_song_features } = row.original;
        if ( status === "processed" ) {
          return local_song_features.sad + " %"
        } else {
          return <span className="text-gray-300"> --- </span>
        }
      }
    },
    {
      accessorKey: "relaxed",
      header: "Relaxed",
      cell: ({ row }: {row: any}) => {
        const { status, local_song_features } = row.original;
        if ( status === "processed" ) {
          return local_song_features.relaxed + " %"
        } else {
          return <span className="text-gray-300"> --- </span>
        }
      }
    },
    {
      accessorKey: "engagement",
      header: "Engagement",
      cell: ({ row }: {row: any}) => {
        const { status, local_song_features } = row.original;
        if ( status === "processed" ) {
          return local_song_features.engagement + " %"
        } else {
          return <span className="text-gray-300"> --- </span>
        }
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: any }) => {
        const status = row.getValue("status");

        if (status === "processed") {
          return (
            <Badge
              variant="outline"
              className="gap-1 text-muted-foreground px-1.5"
            >
              <CheckCircle className="size-3 fill-green-500 dark:fill-green-400 text-white" />
              Done
            </Badge>
          );
        }
        else if (status == "pending") {
          return (
            <Badge
              variant="outline"
              className="gap-1 text-muted-foreground px-1.5"
            >
              <Clock className="size-3 fill-yellow-500 dark:fill-yellow-400" />
              Pending
            </Badge>
          );
        }
        else if (status == "queued") {
          return (
            <Badge
              variant="outline"
              className="gap-1 text-muted-foreground px-1.5"
            >
              <Loader className="size-3 fill-yellow-500 dark:fill-yellow-400" />
              In Process
            </Badge>
          );
        }
     },
    },
    {
      accessorKey: "created_at",
      header: "created_at",
      defaultVisible: false
    },
  ]

  const [data, setData] = useState<Song[]>([])
  
  useEffect(() => {
    getSongs().then((songs) => {
      setData(songs);
    });
  }, []);

  return (
    <div className="container mx-auto py-10 w-full">
      <DataTable columns={columns} data={data} />
    </div>    
  );
}
