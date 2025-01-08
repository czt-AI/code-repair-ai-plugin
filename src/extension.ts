import * as vscode from 'vscode';
import { autorepairService } from './services/autorepairService';
import { codeSuggestionsService } from './services/codeSuggestionsService';
import { codeAnalysisService } from './services/codeAnalysisService';
import { openaiService } from './services/openaiService';

export function activate(context: vscode.ExtensionContext) {
    // 注册自动修复命令
    let disposable = vscode.commands.registerCommand('extension.autorepair', () => {
        autorepairService.fixCode();
    });

    // 注册代码建议命令
    disposable = vscode.commands.registerCommand('extension.codesuggestions', () => {
        codeSuggestionsService.showSuggestions();
    });

    // 注册代码分析命令
    disposable = vscode.commands.registerCommand('extension.codeanalysis', () => {
        codeAnalysisService.analyzeCode();
    });

    // 注册OpenAI SDK集成命令
    disposable = vscode.commands.registerCommand('extension.openaisdk', () => {
        openaiService.initialize();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

code-repair-ai-plugin/src/services/openaiService.ts

import { Configuration, OpenAIApi } from 'openai';
import * as vscode from 'vscode';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export class OpenAIService {
    async initialize() {
        try {
            const response = await openai.completions({
                model: "text-davinci-002",
                prompt: "Hello, how can I help you today?",
                max_tokens: 50,
            });
            console.log(response.data.choices[0].text);
        } catch (error) {
            console.error('Error initializing OpenAI SDK:', error);
        }
    }

    async analyzeCode(code: string) {
        try {
            const response = await openai.completions({
                model: "code-davinci-002",
                prompt: `Analyze and suggest improvements for the following code:\n\n${code}`,
                max_tokens: 150,
            });
            return response.data.choices[0].text;
        } catch (error) {
            console.error('Error analyzing code with OpenAI SDK:', error);
            return '';
        }
    }
}

code-repair-ai-plugin/src/services/codeAnalysisService.ts

import * as vscode from 'vscode';
import { OpenAIService } from './openaiService';

export class CodeAnalysisService {
    private openaiService: OpenAIService;

    constructor() {
        this.openaiService = new OpenAIService();
    }

    async analyzeCode() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const selectedText = editor.selection;

        if (selectedText.isEmpty) {
            vscode.window.showErrorMessage('Please select a code snippet to analyze.');
            return;
        }

        const code = document.getText(selectedText);
        const analysisResult = await this.openaiService.analyzeCode(code);
        vscode.window.showInformationMessage(analysisResult);
    }
}

code-repair-ai-plugin/src/services/autorepairService.ts

import * as vscode from 'vscode';
import { OpenAIService } from './openaiService';

export class AutorepairService {
    private openaiService: OpenAIService;

    constructor() {
        this.openaiService = new OpenAIService();
    }

    async fixCode() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const selectedText = editor.selection;

        if (selectedText.isEmpty) {
            vscode.window.showErrorMessage('Please select a code snippet to fix.');
            return;
        }

        const code = document.getText(selectedText);
        const fixedCode = await this.openaiService.analyzeCode(code); // Assuming analyzeCode returns fixed code
        editor.edit((editBuilder) => {
            editBuilder.replace(selectedText, fixedCode);
        });
    }
}

code-repair-ai-plugin/src/services/codeSuggestionsService.ts

import * as vscode from 'vscode';
import { OpenAIService } from './openaiService';

export class CodeSuggestionsService {
    private openaiService: OpenAIService;

    constructor() {
        this.openaiService = new OpenAIService();
    }

    async showSuggestions() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const selectedText = editor.selection;

        if (selectedText.isEmpty) {
            vscode.window.showErrorMessage('Please select a code snippet to get suggestions.');
            return;
        }

        const code = document.getText(selectedText);
        const suggestions = await this.openaiService.analyzeCode(code); // Assuming analyzeCode returns suggestions
        vscode.window.showInformationMessage(suggestions);
    }
}