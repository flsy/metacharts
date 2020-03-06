import * as React from "react";

export interface InjectedProps {
  focused?: string;
  onFocus: (label: string | undefined) => void;
}

interface State {
  focused?: string;
}

function focusedHOC<P>(Wrapped: React.ComponentClass<P & InjectedProps> | React.StatelessComponent<P & InjectedProps>): React.ComponentClass<P> {
  return class extends React.Component<P, State> {
    constructor(props: P) {
      super(props);
      this.state = {
        focused: undefined,
      };
    }

    public render() {
      return (
        <Wrapped
          {...this.props}
          onFocus={(focused) => this.setState({ focused })}
          focused={this.state.focused}
        />
      );
    }
  };
}

export default focusedHOC;
