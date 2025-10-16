/**
 * NativeScript 核心服务
 * 统一封装 @nativescript/core 的使用，避免在组件中直接导入
 */

import { 
  ApplicationSettings, 
  TouchManager, 
  CoreTypes,
  Http,
  HttpResponse,
  alert,
  confirm,
  prompt,
  action,
  login,
  ActionOptions,
  AlertOptions,
  ConfirmOptions,
  PromptOptions,
  LoginOptions
} from '@nativescript/core';

export class NativeScriptService {
  // ==================== 应用设置 ====================
  static getString(key: string, defaultValue?: string): string {
    return ApplicationSettings.getString(key, defaultValue);
  }

  static setString(key: string, value: string): void {
    ApplicationSettings.setString(key, value);
  }

  static getNumber(key: string, defaultValue?: number): number {
    return ApplicationSettings.getNumber(key, defaultValue);
  }

  static setNumber(key: string, value: number): void {
    ApplicationSettings.setNumber(key, value);
  }

  static getBoolean(key: string, defaultValue?: boolean): boolean {
    return ApplicationSettings.getBoolean(key, defaultValue);
  }

  static setBoolean(key: string, value: boolean): void {
    ApplicationSettings.setBoolean(key, value);
  }

  static remove(key: string): void {
    ApplicationSettings.remove(key);
  }

  static clear(): void {
    ApplicationSettings.clear();
  }

  static hasKey(key: string): boolean {
    return ApplicationSettings.hasKey(key);
  }

  // ==================== 触摸管理 ====================
  static enableGlobalTapAnimations(): void {
    TouchManager.enableGlobalTapAnimations = true;
  }

  static disableGlobalTapAnimations(): void {
    TouchManager.enableGlobalTapAnimations = false;
  }

  static setTapAnimations(animations: any): void {
    TouchManager.animations = animations;
  }

  // ==================== 动画类型 ====================
  static get AnimationCurve() {
    return CoreTypes.AnimationCurve;
  }

  // ==================== HTTP 请求 ====================
  static async httpRequest(options: any): Promise<HttpResponse> {
    return await Http.request(options);
  }

  // ==================== 对话框 ====================
  static async showAlert(options: AlertOptions): Promise<void> {
    return await alert(options);
  }

  static async showConfirm(options: ConfirmOptions): Promise<boolean> {
    return await confirm(options);
  }

  static async showPrompt(options: PromptOptions): Promise<{ text: string; result: boolean }> {
    return await prompt(options);
  }

  static async showAction(options: ActionOptions): Promise<string> {
    return await action(options);
  }

  static async showLogin(options: LoginOptions): Promise<{ userName: string; password: string }> {
    return await login(options);
  }

  // ==================== 便捷方法 ====================
  static async showSimpleAlert(title: string, message: string): Promise<void> {
    return await this.showAlert({
      title,
      message,
      okButtonText: 'OK'
    });
  }

  static async showSimpleConfirm(title: string, message: string): Promise<boolean> {
    return await this.showConfirm({
      title,
      message,
      okButtonText: 'OK',
      cancelButtonText: 'Cancel'
    });
  }
}
