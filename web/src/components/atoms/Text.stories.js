import React from 'react'
import { SuccessText, FailureText } from './Text'

export default { title: 'Text' }

export const Success = () => <SuccessText>+10%</SuccessText>

export const Failure = () => <FailureText>-10%</FailureText>
