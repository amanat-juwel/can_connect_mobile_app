# Date/Time Picker Components

## Overview

This directory contains two date picker components:

1. **`CustomFormDatePicker.js`** - The original component (may have compatibility issues)
2. **`SystemDatePicker.js`** - New, bulletproof system date picker (recommended)

## SystemDatePicker (Recommended)

The `SystemDatePicker` uses the official `@react-native-community/datetimepicker` package which provides native system date/time pickers. This eliminates all compatibility issues and provides a better user experience.

### Features

- ✅ **No `getTime` errors** - Uses system pickers
- ✅ **Native performance** - Built into the OS
- ✅ **Platform-specific UI** - Follows iOS/Android design guidelines
- ✅ **Reliable** - No third-party dependencies
- ✅ **Formik integration** - Works seamlessly with your forms

### Usage

```javascript
import SystemDatePicker from '../components/forms/SystemDatePicker';

// In your form
<SystemDatePicker
  name="pickup_date"
  label="Select Pickup Date"
  errorMessage="Date is required"
  mode="date"
  minimumDate={new Date()}
  height={40}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | - | Form field name (required) |
| `label` | string | - | Display label (required) |
| `errorMessage` | string | - | Error message to display |
| `mode` | 'date' \| 'time' | 'date' | Picker mode |
| `height` | number | 60 | Component height |
| `width` | string | '100%' | Component width |
| `minimumDate` | Date | - | Minimum selectable date |
| `maximumDate` | Date | - | Maximum selectable date |
| `onchange` | function | - | Callback when value changes |

## Migration from CustomFormDatePicker

To replace the old date picker with the new system picker:

### 1. Replace the import

```javascript
// Old
import CustomFormDatePicker from '../components/forms/CustomFormDatePicker';

// New
import SystemDatePicker from '../components/forms/SystemDatePicker';
```

### 2. Replace the component

```javascript
// Old
<CustomFormDatePicker
  name="pickup_date"
  label="Pickup Date"
  mode="date"
/>

// New
<SystemDatePicker
  name="pickup_date"
  label="Pickup Date"
  mode="date"
/>
```

### 3. The props are identical, so no other changes needed!

## Why SystemDatePicker is Better

1. **No Compatibility Issues**: Uses official React Native community package
2. **Better Performance**: Native system components
3. **Consistent UI**: Follows platform design guidelines
4. **Reliable**: No third-party bugs or breaking changes
5. **Maintained**: Officially supported by React Native team

## Platform Differences

- **Android**: Shows native date/time picker dialogs
- **iOS**: Shows inline spinner picker with Cancel/Done buttons

Both platforms provide the same API and behavior, just with platform-specific UI.
