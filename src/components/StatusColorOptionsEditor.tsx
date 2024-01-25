import { PanelOptionsEditorProps, standardEditorsRegistry } from '@grafana/data';
import { HorizontalGroup, Label } from '@grafana/ui';
import { StatusPanelOptions } from 'lib/statusPanelOptionsBuilder';
import React from 'react';
import { config } from '@grafana/runtime'

export const StatusColorOptionsEditor: React.FC<PanelOptionsEditorProps<StatusPanelOptions['colors']>> = ({
  value,
  onChange,
  item,
}) => {
  // get grafana color picker and theme
  const colorPicker = standardEditorsRegistry.get('color').editor as any;

  // helper function to build the handler for each color
  const buildHandler = (key: keyof StatusPanelOptions['colors']) => (color: string) =>
    onChange({ ...value, [key]: config.theme.visualization.getColorByName(color) });
  return (
    <HorizontalGroup spacing="lg">
      <div>
        <Label>Critical</Label>
        {colorPicker({ value: value.crit, onChange: buildHandler('crit'), item })}
      </div>
      <div>
        <Label>Warning</Label>
        {colorPicker({ value: value.warn, onChange: buildHandler('warn'), item })}
      </div>
      <div>
        <Label>OK</Label>
        {colorPicker({ value: value.ok, onChange: buildHandler('ok'), item })}
      </div>
      <div>
        <Label>Disabled</Label>
        {colorPicker({ value: value.disable, onChange: buildHandler('disable'), item })}
      </div>
    </HorizontalGroup>
  );
};
