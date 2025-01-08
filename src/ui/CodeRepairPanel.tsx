import React from 'react';
import { Panel, Text, Button, Input } from '@vscode-alt/monaco-editor/esm/vs/platform/widgets/common';
import { CodeRepairService } from '../services/autorepairService';

interface CodeRepairPanelProps {}

interface CodeRepairPanelState {
  selectedCode: string;
  analysisResult: string;
}

export class CodeRepairPanel extends React.Component<CodeRepairPanelProps, CodeRepairPanelState> {
  private codeRepairService: CodeRepairService;

  constructor(props: CodeRepairPanelProps) {
    super(props);
    this.state = {
      selectedCode: '',
      analysisResult: '',
    };
    this.codeRepairService = new CodeRepairService();
  }

  handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ selectedCode: event.target.value });
  };

  handleAnalyzeClick = async () => {
    const result = await this.codeRepairService.analyzeCode(this.state.selectedCode);
    this.setState({ analysisResult: result });
  };

  render() {
    return (
      <Panel>
        <Text>请输入代码片段：</Text>
        <Input value={this.state.selectedCode} onChange={this.handleCodeChange} />
        <Button onClick={this.handleAnalyzeClick}>分析代码</Button>
        <Text>分析结果：</Text>
        <Text>{this.state.analysisResult}</Text>
      </Panel>
    );
  }
}
