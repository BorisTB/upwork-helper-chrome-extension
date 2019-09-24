import React from 'react'
import styled from '@emotion/styled'

const Input = styled.input`
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

const TextField: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => (
  <Input {...props} />
)

export { TextField }
