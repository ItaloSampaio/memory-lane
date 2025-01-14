import { Button } from '@design-system/components/button/button'
import { Select } from '@design-system/components/select/select'
import { SelectContent } from '@design-system/components/select/select-content'
import { SelectItem } from '@design-system/components/select/select-item'
import { SelectTrigger } from '@design-system/components/select/select-trigger'
import PlusIcon from '@heroicons/react/20/solid/PlusIcon'
import { SortDirection } from '@utils/sort-utils'
import { useCallback, useState } from 'react'
import { useMemoryLanePage } from '../use-memory-lane-page'

const sortOptions: Array<{ label: string; value: SortDirection }> = [
  { label: 'Older to newer', value: 'asc' },
  { label: 'Newer to older', value: 'desc' },
]

export const Controls = () => {
  const { readOnly, memories, goToCreateMemory, setSortOrder } =
    useMemoryLanePage()

  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0])

  const handleSelectedSortOption = useCallback(
    (value: string) => {
      const option = sortOptions.find((item) => item.value === value)
      if (!option) {
        return
      }

      setSelectedSortOption(option)
      setSortOrder(option.value)
    },
    [setSortOrder]
  )

  return (
    <div className='flex justify-between items-center mb-8 sticky top-6 z-10'>
      {memories?.length ? (
        <Select
          value={selectedSortOption.value}
          textValue={selectedSortOption.label}
          onChange={handleSelectedSortOption}
        >
          <SelectTrigger />
          <SelectContent>
            {sortOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div />
      )}
      {!readOnly && (
        <Button variant='outlined' onClick={goToCreateMemory}>
          <PlusIcon />
          New memory
        </Button>
      )}
    </div>
  )
}
