import React from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

interface IProps extends TouchableOpacityProps {
  inverted?: boolean;
  text?: string;
  fullWidth?: boolean;
}

const Button = ({
  children,
  inverted,
  text,
  fullWidth = true,
  style,
  disabled,
  ...props
}: React.PropsWithChildren<IProps>) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[
        styles.baseButton,
        inverted && styles.invertedButton,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      {!!text && (
        <Text
          style={[
            styles.baseText,
            inverted && styles.invertedText,
            disabled && styles.disabled,
          ]}
        >
          {text}
        </Text>
      )}
      {!text && children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    backgroundColor: 'darkblue',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
  },
  fullWidth: {
    width: '100%',
  },
  invertedButton: {
    backgroundColor: 'transparent',
    borderColor: 'darkblue',
  },
  baseText: {
    color: 'white',
    fontSize: 18,
  },
  invertedText: {
    color: 'darkblue',
  },
  disabled: {
    backgroundColor: 'lightgray',
    borderColor: 'gray',
    color: 'gray',
  },
});

export default Button;
