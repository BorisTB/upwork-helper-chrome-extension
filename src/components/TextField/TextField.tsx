import React from 'react'
import styled from '@emotion/styled'

export interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  fullWidth?: boolean
}

const Input = styled(({ fullWidth, ...props }) => <input {...props} />)`
  ${({ fullWidth }) => fullWidth ? 'width: 100%' : ''};
  min-height: 40px;
  height: 40px;
  padding: 10px 19px;
  color: #222;
  font-size: 13px;
  line-height: 18px;
  background-color: #fff;
  background-image: none;
  background-clip: padding-box;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  &:hover,
  &:focus {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    border-color: #008329;
  }
`

const TextField: React.FC<TextFieldProps> = (props) => (
  <Input {...props} />
)

export { TextField }
