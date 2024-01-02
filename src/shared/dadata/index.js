import PropTypes from "prop-types";
import React from "react";
import Highlighter from "react-highlight-words";

import "./index.css";
import { InputField } from "@/ui/index";

const wordsToPass = ["г", "респ", "ул", "р-н", "село", "деревня", "поселок", "пр-д", "пл", "к", "кв", "обл", "д"];

const defaultSuggestion = {
  data: {},
  unrestricted_value: "",
  value: "",
};

const defaultEndpoint = {
  api: "suggestions/api/4_1/rs/suggest",
  host: "https://suggestions.dadata.ru",
};

const defaultClasses = {
  "react-dadata__custom-action": "react-dadata__suggestion react-dadata__custom-action",
  "react-dadata__suggestion": "react-dadata__suggestion",
  "react-dadata__suggestion-note": "react-dadata__suggestion-note",
  "react-dadata__suggestions": "react-dadata__suggestions",
};

const getStylingProps = (baseClass, customStyles = {}, additionalClass) => {
  return customStyles[baseClass] && typeof customStyles[baseClass] === "object"
    ? {
        className: `${defaultClasses[baseClass] || baseClass} ${additionalClass || ""}`.trim(),
        style: customStyles[baseClass],
      }
    : {
        className: `${defaultClasses[baseClass] || baseClass} ${additionalClass || ""} ${
          customStyles[baseClass] || ""
        }`.trim(),
      };
};

const backslashTailFix = (uriPart) => (uriPart.endsWith("/") ? uriPart.slice(0, -1) : uriPart);

const buildTargetURI = (customEndpoint) => {
  if (typeof customEndpoint === "string") {
    if (/^http[s]?:/g.test(customEndpoint) || customEndpoint.startsWith("/")) {
      // Full path of host (API placed automatically - back compatibility to v1.2.8 and later)
      return backslashTailFix(`${customEndpoint}/${defaultEndpoint.api}`);
    }
  } else if (customEndpoint instanceof Object) {
    // Customize by object
    const endpointObject = { ...defaultEndpoint, ...customEndpoint };
    return `${backslashTailFix(endpointObject.host)}/${backslashTailFix(endpointObject.api)}`;
  }

  // Default
  return backslashTailFix(`${defaultEndpoint.host}/${defaultEndpoint.api}`);
};

const getHighlightWords = (query) => {
  const words = query.replace(",", "").split(" ");
  const filteredWords = words.filter((word) => wordsToPass.indexOf(word) < 0);
  return filteredWords;
};

const fakeRandomKey = () => Math.random().toString(16).slice(2);

const SuggestionInfo = ({ data = {}, type }) => (
  <div className="react-dadata__suggestion-info">
    <span>
      {[type === "party" ? data.inn || null : data.bic || null, (data.address && data.address.value) || null].join(" ")}
    </span>
  </div>
);

const renderCustomActions = ({ customActions, customStyles, suggestions }, muteEventHandler, onBlur) => {
  if (!customActions) return [];

  let actions = customActions instanceof Function ? customActions(suggestions) : customActions;

  actions = actions instanceof Array ? actions : actions ? [actions] : false;

  return actions && actions.length
    ? [<hr key={"custom-actions-line"} className="actions-delimiter" />].concat(
        actions.map((node) => (
          <div
            key={fakeRandomKey()}
            onMouseDown={muteEventHandler}
            onClick={onBlur}
            {...getStylingProps("react-dadata__custom-action", customStyles)}>
            {node}
          </div>
        )),
      )
    : false;
};

const SuggestionsList = ({ actions = [], customStyles, onSuggestionClick, query, suggestionIndex, suggestions, type }) => {
  return (
    Boolean(suggestions.length || actions.length) && (
      <div {...getStylingProps("react-dadata__suggestions", customStyles)}>
        {suggestions.map(({ value, data }, index) => (
          <div
            key={fakeRandomKey()}
            onMouseDown={() => {
              onSuggestionClick(index);
            }}
            {...getStylingProps(
              "react-dadata__suggestion",
              customStyles,
              index === suggestionIndex && "react-dadata__suggestion--current",
            )}>
            <Highlighter
              highlightClassName="react-dadata--highlighted"
              searchWords={getHighlightWords(query)}
              textToHighlight={value}
              autoEscape
            />
            {(type === "party" || type === "bank") && <SuggestionInfo data={data} type={type} />}
          </div>
        ))}
        {actions}
      </div>
    )
  );
};

class ReactDaDataBox extends React.PureComponent {
  state = {
    inputFocused: false,
    isValid: false,
    query: this.props.query || "",
    showSuggestions: true,
    suggestionIndex: 0,
    suggestions: [],
    type: this.props.type || "address",
    personType: this.props.personType,
  };

  static displayName = "ReactDaDataBox";

  xhr;
  debounceTimer;
  componentDidMount = () => {
    this.xhr = new XMLHttpRequest();
    if (this.props.query || this.props.silentQuery) {
      this.fetchSuggestions(null, () => {
        if (this.props.silentInit) {
          const forceSelect = this.props.silentInit(this.state.suggestions);
          if (forceSelect !== undefined && typeof forceSelect === "number" && forceSelect < this.state.suggestions.length) {
            this.selectSuggestion(forceSelect);
          }
        }
      });
    }
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.query !== prevProps.query) {
      this.setState({ query: this.props.query }, this.fetchSuggestions);
    }
  };

  componentWillUnmount() {
    // Cancel all subscriptions and asynchronous tasks
    clearTimeout(this.debounceTimer);
    this.xhr.abort();
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  onInputFocus = () => {
    if (!this.state.value && this.props.silentQuery) {
      this.fetchSuggestions({ inputFocused: true, showSuggestions: true });
    } else {
      this.setState({ inputFocused: true });
    }
  };

  onInputBlur = (e) => {
    this.setState({ inputFocused: false });
    if (e && this.props.onBlur) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onBlur(e, this.state.query);
    }
  };

  debounce = (func, cooldown = 350) => {
    return (...args) => {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        func(...args);
      }, cooldown);
    };
  };

  onInputChange = ({ field, id, value }) => {
    this.onChangeDeafult(value);
    this.setState({ query: value, showSuggestions: true }, () => {
      this.debounce(this.fetchSuggestions, this.props.debounce)({ inputFocused: true, showSuggestions: true });
    });

    !value && this.clear();
  };

  onChangeDeafult = (val) => {
    this.props.onChange({}, val);
  };

  onKeyPress = (event) => {
    const { suggestionIndex, suggestions } = this.state;

    if (event.which === 40 && suggestionIndex < suggestions.length - 1) {
      // Arrow down
      this.setState((prevState) => ({
        suggestionIndex: prevState.suggestionIndex + 1,
      }));
    } else if (event.which === 38 && suggestionIndex > 0) {
      // Arrow up
      this.setState((prevState) => ({
        suggestionIndex: prevState.suggestionIndex - 1,
      }));
    } else if (event.which === 39 && suggestionIndex >= 0) {
      // Arrow right
      this.selectSuggestion(this.state.suggestionIndex, true);
    } else if (event.which === 13 && suggestionIndex >= 0) {
      // Enter
      event.preventDefault();
      event.stopPropagation();
      this.selectSuggestion(this.state.suggestionIndex);
    }
  };

  fetchSuggestions = (setStateAdditional = {}, callback) => {
    this.xhr.abort();
    const { type } = this.state;
    const { city, customEndpoint } = this.props;

    let payload = {
      query: this.state.query || this.props.silentQuery,
      count: this.props.count || 10,
      type: this.state.personType,
    };

    if (city && type === "address") {
      payload.from_bound = { value: "city" };
      payload.to_bound = { value: "settlement" };
      payload.value = "settlement";
    }

    if (this.props.payloadModifier) {
      payload =
        this.props.payloadModifier instanceof Function
          ? this.props.payloadModifier(payload)
          : this.props.payloadModifier instanceof Object
            ? Object.assign(payload, this.props.payloadModifier)
            : payload;
    }

    this.xhr.open("POST", `${backslashTailFix(buildTargetURI(customEndpoint))}/${type}`);
    this.xhr.setRequestHeader("Accept", "application/json");
    this.xhr.setRequestHeader("Authorization", `Token ${this.props.token}`);
    this.xhr.setRequestHeader("Content-Type", "application/json");
    this.xhr.send(JSON.stringify(payload));

    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState !== 4) {
        return;
      }

      if (this.xhr.status === 200) {
        const { suggestions } = JSON.parse(this.xhr.response);
        const stateAdditions = setStateAdditional || {};

        if (suggestions && suggestions.length) {
          this.setState(
            {
              ...stateAdditions,
              ...{
                suggestions,
                suggestionIndex: 0,
                showSuggestions:
                  this.state.inputFocused || stateAdditions.inputFocused ? Boolean(stateAdditions.showSuggestions) : false,
              },
            },
            callback,
          );
        } else if (this.props.onIdleOut) {
          this.props.onIdleOut(this.state.query);
        }
      }
    };
  };

  onSuggestionClick = (index) => {
    if (this.state.suggestions[index]) {
      this.selectSuggestion(index);
    }
  };

  clear = () => {
    this.setState({
      query: "",
      showSuggestions: false,
    });
    this.props.onChange && this.props.onChange(defaultSuggestion);
  };

  selectSuggestion = (index, showSuggestions = false) => {
    const { suggestions } = this.state;
    const { data } = suggestions[index];
    const value = data[this.props.field];

    this.setState({
      query: value,
      personType: this.props.personType,
      showSuggestions,
    });

    if (this.props.onChange) {
      this.props.onChange(suggestions[index]);
    }
  };

  muteEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showSuggestions: false });
    }
  };

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  render() {
    const { inputFocused, query, showSuggestions, suggestionIndex, suggestions, type } = this.state;
    const {
      allowClear,
      autocomplete,
      className,
      customActions,
      customInput,
      customStyles,
      forceOpenList,
      placeholder,
      style,
      field,
      required,
      id,
      label,
      mask,
      disabled,
      invalid,
      hasLabelMark,
      helperText,
      personType,
    } = this.props;

    const showSuggestionsList = inputFocused && showSuggestions;

    const inputConfig = {
      autoComplete: (autocomplete === "on" && autocomplete) || "off",
      className: `react-dadata__input${allowClear ? " react-dadata__input-clearable" : ""}`,
      onBlur: this.onInputBlur,
      onChange: this.onInputChange,
      onFocus: this.onInputFocus,
      onKeyDown: this.onKeyPress,
      placeholder,
      value: query ? query : "",
      name: field,
      required,
      label,
      id,
      mask,
      disabled,
      invalid,
      hasLabelMark,
      helperText,
      personType,
    };

    return (
      <div ref={this.setWrapperRef} className={`react-dadata react-dadataContainer ${className}`} style={style}>
        {customInput(inputConfig)}
        {allowClear && query && (
          <span className="react-dadata__input-suffix" onClick={this.clear}>
            <i className="react-dadata__icon react-dadata__icon-clear" />
          </span>
        )}
        {(showSuggestionsList || forceOpenList) && (
          <SuggestionsList
            actions={
              customActions &&
              renderCustomActions(
                {
                  customActions,
                  customStyles,
                  suggestions,
                },
                this.muteEventHandler,
                this.onInputBlur,
              )
            }
            customStyles={customStyles}
            suggestions={suggestions}
            suggestionIndex={suggestionIndex}
            query={query}
            type={type}
            personType={personType}
            onSuggestionClick={this.onSuggestionClick}
          />
        )}
      </div>
    );
  }
}

ReactDaDataBox.propTypes = {
  allowClear: PropTypes.bool,
  autocomplete: PropTypes.bool,
  city: PropTypes.bool,
  className: PropTypes.string,
  count: PropTypes.number,
  customActions: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  customEndpoint: PropTypes.oneOfType([PropTypes.object, PropTypes.shape, PropTypes.string]),
  customInput: PropTypes.func,
  customStyles: PropTypes.object,
  debounce: PropTypes.number,
  forceOpenList: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onIdleOut: PropTypes.func,
  payloadModifier: PropTypes.oneOfType([PropTypes.object, PropTypes.shape, PropTypes.func]),
  placeholder: PropTypes.string,
  query: PropTypes.string,
  silentInit: PropTypes.func,
  silentQuery: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  token: PropTypes.string.isRequired,
  type: PropTypes.string,
};

ReactDaDataBox.defaultProps = {
  type: "address",
  customInput: (params) => <InputField {...params} />,
};

export { ReactDaDataBox };

export default ReactDaDataBox;
