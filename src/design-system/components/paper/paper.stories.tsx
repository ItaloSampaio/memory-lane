import { Meta, StoryObj } from '@storybook/react'
import { Paper } from './paper'

const meta: Meta<typeof Paper> = {
  title: 'Components/Paper',
  component: Paper,
}

export default meta

type Story = StoryObj<typeof Paper>

export const Default: Story = {
  args: {
    className: 'w-full',
    children: 'Default',
  },
  render: (args) => <Paper {...args} />,
}
