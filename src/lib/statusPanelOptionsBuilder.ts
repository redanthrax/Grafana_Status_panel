import { PanelOptionsEditorBuilder } from '@grafana/data';
import { StatusColorOptionsEditor } from 'components/StatusColorOptionsEditor';

export interface StatusPanelOptions {
  clusterName: string;
  clusterUrl: string;
  clusterTargetBlank: boolean;
  namePrefix: string;
  maxAlertNumber: number;
  cornerRadius: string;
  flipCard: boolean;
  flipTime: number;
  colorMode: 'Panel' | 'Metric' | 'Disabled';
  colors: { crit: string; warn: string; ok: string; disable: string };
  isAutoScrollOnOverflow: boolean;
  isGrayOnNoData: boolean;
  isIgnoreOKColors: boolean;
  isHideAlertsOnDisable: boolean;
}

// Define default values for the colors
const defaultColorValues = {
  crit: 'red', // default critical color
  warn: 'orange', // default warning color
  ok: 'green', // default OK color
  disable: 'gray' // default disabled color
};

export const statusPanelOptionsBuilder = (builder: PanelOptionsEditorBuilder<StatusPanelOptions>) =>
  builder
    .addTextInput({
      path: 'clusterName',
      name: 'Cluster Name',
      description: '',
      defaultValue: '',
      category: ['Panel Options'],
      settings: { expandTemplateVars: true },
    })
    .addTextInput({
      path: 'clusterUrl',
      name: 'Cluster URL',
      description: '',
      defaultValue: '',
      category: ['Panel Options'],
      settings: { expandTemplateVars: true },
    })
    .addBooleanSwitch({
      path: 'clusterTargetBlank',
      name: 'Open Cluster URL in new tab',
      defaultValue: false,
      category: ['Panel Options'],
      showIf: ({ clusterUrl }) => !!clusterUrl,
    })
    .addTextInput({
      path: 'namePrefix',
      name: 'Remove Prefix',
      defaultValue: '',
      description: 'A prefix to remove from the name (helpful when repeating panel over a template)',
      category: ['Panel Options'],
    })
    .addNumberInput({
      path: 'maxAlertNumber',
      name: 'Max Alerts',
      defaultValue: -1,
      description: 'Max alerts number to show in the panel. In case value is less than zero, show all alerts',
      category: ['Panel Options'],
    })
    .addTextInput({
      path: 'cornerRadius',
      name: 'Corner Radius',
      defaultValue: '0rem',
      description: 'The corner radius to apply the panel. Values are used for the border-radius CSS attribute.',
      category: ['Panel Options'],
    })
    .addBooleanSwitch({ path: 'flipCard', name: 'Flip Panel', defaultValue: false, category: ['Panel Options'] })
    .addNumberInput({
      path: 'flipTime',
      name: 'Flip interval',
      defaultValue: 5,
      category: ['Panel Options'],
      showIf: ({ flipCard }) => flipCard,
    })
    .addSelect({
      path: 'colorMode',
      name: 'Coloring Mode',
      description: '',
      defaultValue: 'Panel',
      settings: {
        options: [
          { label: 'Panel', value: 'Panel', description: 'Apply color to the panel background' },
          { label: 'Metric', value: 'Metric', description: 'Apply color to the metric text' },
          { label: 'Disabled', value: 'Disabled', description: 'Do not apply any coloring' },
        ],
      },
      category: ['Threshold Options'],
    })
    // Default colors match Table Panel so colorised text is easier to read
    .addCustomEditor({
      id: 'colors',
      path: 'colors',
      name: 'Colors',
      editor: StatusColorOptionsEditor,
      category: ['Threshold Options'],
      defaultValue: defaultColorValues,
    })
    .addBooleanSwitch({
      path: 'isAutoScrollOnOverflow',
      name: 'Auto scroll alerts on overflow',
      defaultValue: false,
      category: ['Other Options'],
    })
    .addBooleanSwitch({
      path: 'isGrayOnNoData',
      name: "Use 'Disable' color if no data",
      defaultValue: false,
      category: ['Other Options'],
    })
    .addBooleanSwitch({
      path: 'isIgnoreOKColors',
      name: 'Ignore color in OK state',
      defaultValue: false,
      category: ['Other Options'],
    })
    .addBooleanSwitch({
      path: 'isHideAlertsOnDisable',
      name: 'Hide alerts in Disabled state',
      defaultValue: false,
      category: ['Other Options'],
    });
