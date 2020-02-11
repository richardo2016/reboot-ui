import React from "react";
import * as PreactHooks from 'preact/hooks'

for (let key in PreactHooks.__moduleExports) {
    React[key] = PreactHooks.__moduleExports[key]
}