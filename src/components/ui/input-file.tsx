"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>("")

  return (
    <div className="flex items-center gap-3">
   
      <input
        type="file"
        ref={fileInputRef}
        className="hidden "
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name)
          }
        }}
      />
 
      
      <Button variant="Subtle"
      className="bg-transparent !text-end ps-48 !pe-0  relative text-maroon-600  h-12 w-80 rounded-lg  border-2    text-base transition-colors md:text-sm dark:bg-zinc-700 dark:border-zinc-600 dark:hover:border-zinc-500 dark:text-zinc-400 dark:focus:border-softpink-400"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
         {fileName && (
        <span className="text-sm text-muted-foreground w-10 absolute start-0">
          {fileName}
        </span>
      )}
       <Upload/> Upload file
      </Button>

   
    
    </div>
  )
}
