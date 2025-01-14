import { FormField } from './form-field'

export default {
  title: 'Components/FormField',
  component: FormField,
}

export const Default = () => (
  <FormField label='Input' placeholder='Enter text here' />
)

export const WithError = () => (
  <FormField
    label='Input with Error'
    placeholder='Write something here'
    error='Required'
  />
)

export const TextArea = () => (
  <FormField
    label='Text Area'
    as='textarea'
    placeholder='Write something here'
  />
)
