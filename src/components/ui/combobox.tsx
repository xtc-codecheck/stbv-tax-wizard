import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxOption {
  value: string
  label: string
  category?: string
  keywords?: string[]
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  emptyText?: string
  searchPlaceholder?: string
  className?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Auswählen...",
  emptyText = "Keine Ergebnisse gefunden.",
  searchPlaceholder = "Suchen...",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Group options by category
  const categorizedOptions = React.useMemo(() => {
    const grouped = options.reduce((acc, option) => {
      const category = option.category || "Sonstige"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(option)
      return acc
    }, {} as Record<string, ComboboxOption[]>)
    return grouped
  }, [options])

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return categorizedOptions

    const query = searchQuery.toLowerCase()
    const filtered: Record<string, ComboboxOption[]> = {}

    Object.entries(categorizedOptions).forEach(([category, opts]) => {
      const matchingOpts = opts.filter((option) => {
        const labelMatch = option.label.toLowerCase().includes(query)
        const valueMatch = option.value.toLowerCase().includes(query)
        const keywordMatch = option.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(query)
        )
        return labelMatch || valueMatch || keywordMatch
      })

      if (matchingOpts.length > 0) {
        filtered[category] = matchingOpts
      }
    })

    return filtered
  }, [categorizedOptions, searchQuery])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {Object.entries(filteredOptions).map(([category, opts]) => (
              <CommandGroup key={category} heading={category}>
                {opts.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onValueChange(option.value)
                      setOpen(false)
                      setSearchQuery("")
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
