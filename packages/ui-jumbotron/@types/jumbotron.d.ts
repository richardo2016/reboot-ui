import React from 'react';
/**
 * @see https://getbootstrap.com/docs/4.4/components/jumbotron/#supported-content
 *
 * @inner-content `.jumbotron`
 */
declare const Jumbotron: ({ children, as: _as, fluid, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
    as?: any;
    ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
    class?: string | undefined;
} & {
    fluid?: boolean | undefined;
}>) => JSX.Element;
export default Jumbotron;
