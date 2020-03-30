import React from 'react';
export default function customOnClick(original?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void, substitute?: (...args: any) => void): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
