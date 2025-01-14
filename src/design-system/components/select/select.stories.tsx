import { useState } from 'react'
import { Select } from './select'
import { SelectContent } from './select-content'
import { SelectItem } from './select-item'
import { SelectTrigger } from './select-trigger'

export default { title: 'Components/Select' }

const options = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
]


export const Default = () => {
  const [value, setValue] = useState<string>()

  return (
    <Select value={value} onChange={setValue}>
      <SelectTrigger placeholder='Select' />
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
