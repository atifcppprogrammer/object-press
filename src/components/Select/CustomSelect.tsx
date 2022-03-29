import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';

export const CustomSelect = (props) => {
  const selection: any[] | undefined = props.value;

  return (
    <FormControl
      caption={!selection[0] && 'Selection should not be empty'}
      positive={!!selection[0]}
    >
      <Select
        {...props}
        overrides={{
          Placeholder: {
            style: ({ $theme }) => {
              return {
                ...$theme.typography.fontBold14,
                color: $theme.colors.textNormal,
              };
            },
          },
          DropdownListItem: {
            style: ({ $theme }) => {
              return {
                ...$theme.typography.fontBold14,
                color: $theme.colors.textNormal,
              };
            },
          },
          OptionContent: {
            style: ({ $theme, $selected }) => {
              return {
                ...$theme.typography.fontBold14,
                color: $selected
                  ? $theme.colors.textDark
                  : $theme.colors.textNormal,
              };
            },
          },
          SingleValue: {
            style: ({ $theme }) => {
              return {
                ...$theme.typography.fontBold14,
                color: $theme.colors.textNormal,
              };
            },
          },
          Popover: {
            props: {
              overrides: {
                Body: {
                  style: { zIndex: 5 },
                },
              },
            },
          },
        }}
      />
    </FormControl>
  );
};
