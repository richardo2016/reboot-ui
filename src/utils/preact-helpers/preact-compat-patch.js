import React from "react";
import * as PreactCompat from 'preact/compat'

for (let key in PreactCompat.__moduleExports) {
    React[key] = PreactCompat.__moduleExports[key]
}