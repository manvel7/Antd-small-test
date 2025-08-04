import {ThemeConfig} from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    // Color tokens
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',

    // Background colors
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBgSpotlight: '#ffffff',
    colorBgMask: 'rgba(0, 0, 0, 0.45)',

    // Text colors
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
    colorTextPlaceholder: 'rgba(0, 0, 0, 0.25)',
    colorTextDisabled: 'rgba(0, 0, 0, 0.25)',

    // Border colors
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',

    // Fill colors
    colorFill: 'rgba(0, 0, 0, 0.15)',
    colorFillSecondary: 'rgba(0, 0, 0, 0.06)',
    colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
    colorFillQuaternary: 'rgba(0, 0, 0, 0.02)',

    // Typography
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,

    // Line height
    lineHeight: 1.5714,
    lineHeightLG: 1.5,
    lineHeightSM: 1.6666,

    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    borderRadiusXS: 2,

    // Control height
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,

    // Padding
    padding: 16,
    paddingLG: 24,
    paddingMD: 16,
    paddingSM: 12,
    paddingXS: 8,
    paddingXXS: 4,

    // Margin
    margin: 16,
    marginLG: 24,
    marginMD: 16,
    marginSM: 12,
    marginXS: 8,
    marginXXS: 4,

    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',

    // Box shadow
    boxShadow:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    boxShadowSecondary:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

    // Screen breakpoints
    screenXS: 480,
    screenSM: 576,
    screenMD: 768,
    screenLG: 992,
    screenXL: 1200,
    screenXXL: 1600
  },
  components: {
    // Button component customization
    Button: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
      paddingInline: 16,
      paddingInlineLG: 24,
      paddingInlineSM: 12
    },

    // Input component customization
    Input: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
      paddingInline: 12,
      paddingInlineLG: 16,
      paddingInlineSM: 8
    },

    // Select component customization
    Select: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24
    },

    // Card component customization
    Card: {
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusSM: 6
    },

    // Table component customization
    Table: {
      borderRadius: 8,
      headerBg: '#fafafa',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      rowHoverBg: '#f5f5f5'
    },

    // Modal component customization
    Modal: {
      borderRadius: 8,
      headerBg: '#ffffff',
      contentBg: '#ffffff',
      footerBg: '#ffffff'
    },

    // Drawer component customization
    Drawer: {
      colorBgElevated: '#ffffff'
    },

    // Menu component customization
    Menu: {
      itemBg: 'transparent',
      itemHoverBg: '#f5f5f5',
      itemSelectedBg: '#e6f7ff',
      itemSelectedColor: '#1890ff'
    },

    // Tabs component customization
    Tabs: {
      itemSelectedColor: '#1890ff',
      itemHoverColor: '#40a9ff',
      itemActiveColor: '#1890ff'
    },

    // Form component customization
    Form: {
      labelColor: 'rgba(0, 0, 0, 0.88)',
      labelRequiredMarkColor: '#ff4d4f'
    },

    // Switch component customization
    Switch: {
      handleBg: '#ffffff',
      handleSize: 20,
      trackHeight: 22,
      trackMinWidth: 44
    },

    // Checkbox component customization
    Checkbox: {
      borderRadius: 2,
      size: 16
    },

    // Radio component customization
    Radio: {
      borderRadius: 50,
      size: 16
    },

    // Slider component customization
    Slider: {
      handleSize: 20,
      handleSizeHover: 22,
      trackBg: '#f0f0f0',
      trackHoverBg: '#e6f7ff',
      railBg: '#f0f0f0',
      railHoverBg: '#e6f7ff'
    },

    // Progress component customization
    Progress: {
      defaultColor: '#1890ff',
      remainingColor: '#f0f0f0'
    },

    // Tag component customization
    Tag: {
      borderRadius: 4,
      colorBgContainer: '#f0f0f0'
    },

    // Tooltip component customization
    Tooltip: {
      borderRadius: 6,
      colorBgSpotlight: 'rgba(0, 0, 0, 0.75)'
    },

    // Popover component customization
    Popover: {
      borderRadius: 8,
      colorBgElevated: '#ffffff'
    },

    // Dropdown component customization
    Dropdown: {
      borderRadius: 6,
      colorBgElevated: '#ffffff'
    },

    // Pagination component customization
    Pagination: {
      itemActiveBg: '#1890ff',
      itemActiveColorDisabled: 'rgba(0, 0, 0, 0.25)',
      itemBg: '#ffffff',
      itemSize: 32
    },

    // DatePicker component customization
    DatePicker: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24
    },

    // Cascader component customization
    Cascader: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24
    },

    // Tree component customization
    Tree: {
      titleHeight: 32,
      nodeSelectedBg: '#e6f7ff',
      nodeHoverBg: '#f5f5f5'
    },

    // Transfer component customization
    Transfer: {
      listHeight: 200,
      itemHeight: 32,
      headerHeight: 40
    },

    // Upload component customization
    Upload: {
      actionsColor: '#1890ff'
    },

    // Avatar component customization
    Avatar: {
      borderRadius: 6,
      colorBgContainer: '#f0f0f0'
    },

    // Badge component customization
    Badge: {
      colorBgContainer: '#ffffff',
      colorError: '#ff4d4f',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorInfo: '#1890ff'
    },

    // Rate component customization
    Rate: {
      colorFillContent: '#f0f0f0'
    },

    // Divider component customization
    Divider: {
      colorSplit: '#f0f0f0'
    },

    // Skeleton component customization
    Skeleton: {
      colorFillContent: '#f0f0f0'
    },

    // Spin component customization
    Spin: {
      colorPrimary: '#1890ff'
    },

    // Alert component customization
    Alert: {
      borderRadius: 6,
      colorSuccessBg: '#f6ffed',
      colorSuccessBorder: '#b7eb8f',
      colorWarningBg: '#fffbe6',
      colorWarningBorder: '#ffe58f',
      colorErrorBg: '#fff2f0',
      colorErrorBorder: '#ffccc7',
      colorInfoBg: '#e6f7ff',
      colorInfoBorder: '#91d5ff'
    },

    // Message component customization
    Message: {
      colorBgElevated: '#ffffff',
      borderRadius: 6
    },

    // Notification component customization
    Notification: {
      colorBgElevated: '#ffffff',
      borderRadius: 8
    }
  }
};

export default lightTheme;
