'use client';
import {forwardRef,type ComponentProps} from 'react';
const Link=forwardRef<HTMLAnchorElement,ComponentProps<'a'>>(function Link(props,ref){return <a ref={ref} {...props}/>});
export default Link;

