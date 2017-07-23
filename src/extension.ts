'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('bigASCIIアクティブ');
	let disposable = vscode.commands.registerCommand('extension.bigASCII', () => {
		// vscode.window.showInformationMessage('Hello World!');
		let bigASCII=new BigASCII("**","  ");
		bigASCII.test();
	});

	context.subscriptions.push(disposable);
}

// export function deactivate() {
// }


class BigASCII{

	private on:string;
	private off:string;

	constructor(_onDot:string="**",_offDot:string="  "){
		this.on=_onDot;
		this.off=_offDot;
	}

	test():void{

		const window=vscode.window

		//===========
		// アクティブなエディタを取得
		const editor = window.activeTextEditor
		if (!editor) {
			//ない場合はインフォメーション出して終了
			window.showInformationMessage('active editor window not found.')
			return
		}
		// window.showInformationMessage('active editor window found!!')


		//===========
		//カーソル位置の行内容を取得する方法を調査

		//document.lineAtでとりあえず行の内容が取れた
		// console.log("lineAt: ",editor.document.lineAt(0))

		//selection.startを食わせることで取れそうな気配
		// const lineText = editor.document.lineAt(0).text
		// console.log("lineText: ",lineText)
		// console.log("editor.selection.start: ",editor.selection.start)

		//カーソル位置の行内容を取得: 成功
		const currentCursorLineText = editor.document.lineAt(editor.selection.start).text
		// console.log("currentCursorLineText: ",currentCursorLineText)



		//===========
		//「BIG:xxxx」で区切られた右側を取得、なかったら終了

		let splitted=currentCursorLineText.split(':')
		if(splitted[0]!='BIG' || splitted.length<2){
			window.showInformationMessage('bigASCII does work "BIG:xxxx" line only.')
			return
		}
		splitted.shift()
		const source=splitted.join(':')
		console.log("対象文字列:",source)

		//===========
		//bigASCII変換

		let fonts=[]
		for(let s of source){
			console.log(s);
			fonts.push(this.get5x5FontDots(s))
		}
		let result="";
		for(let i of [0,1,2,3,4]){
			for(let font of fonts){
				for(let dot of font[i]){
					switch(dot){
						case 0 : result+=this.off ; break ;
						case 1 : result+=this.on  ; break ;
					}
				}
				result+=this.off
			}
			result+="\n";
		}

		console.log("result:\n"+result);

		//===========
		//出力
		
		// lineAtのプロパティはread-only。。
		// editor.document.lineAt(editor.selection.start).text=result

		let range=editor.document.lineAt(editor.selection.start).range
		editor.edit((editorEdit)=>{
			editorEdit.replace(range,result)
		})



	}//test

	private get5x5FontDots(_char:string){
		// Get dots array what fontface within 5x5 proportional dots.
		// respect to silkscreen font by dafont.com (some types modified)
		// http://www.dafont.com/silkscreen.font (100% free)

		// 5x5に収まるフォントドットを返します。
		// dafont.comのSilkscreenフォントを参考にしました。一部改変しています。
		// licenseは「100% free」だそうです。

		let char=_char.toUpperCase()
		switch(char){
			case "A" :
				return [[0,1,1,0],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]]
			case "B" :
				return [[1,1,1,0],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,1,1,0]]
			case "C" :
				return [[0,1,1,0],[1,0,0,1],[1,0,0,0],[1,0,0,1],[0,1,1,0]]
			case "D" :
				return [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,1,0]]
			case "E" :
				return [[1,1,1,1],[1,0,0,0],[1,1,1,1],[1,0,0,0],[1,1,1,1]]
			case "F" :
				return [[1,1,1,1],[1,0,0,0],[1,1,1,1],[1,0,0,0],[1,0,0,0]]
			case "G" :
				return [[0,1,1,1],[1,0,0,0],[1,0,1,1],[1,0,0,1],[0,1,1,0]]
			case "H" :
				return [[1,0,0,1],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1]]
			case "I" :
				return [[1],[1],[1],[1],[1]]
			case "J" :
				return [[0,0,0,1],[0,0,0,1],[0,0,0,1],[1,0,0,1],[0,1,1,0]]
			case "K" :
				return [[1,0,0,1],[1,0,1,0],[1,1,0,0],[1,0,1,0],[1,0,0,1]]
			case "L" :
				return [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,1,1,1]]
			case "M" :
				return [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]]
			case "N" :
				return [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]]
			case "O" :
				return [[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]]
			case "P" :
				return [[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,0,0],[1,0,0,0]]
			case "Q" : //これだけ本家silkscreenでは下に1ドット多いので改変
				return [[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,1,1],[0,1,1,1]]
			case "R" :
				return [[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,1,0],[1,0,0,1]]
			case "S" :
				return [[0,1,1,1],[1,0,0,0],[0,1,1,0],[0,0,0,1],[1,1,1,0]]
			case "T" :
				return [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0]]
			case "U" :
				return [[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]]
			case "V" :
				return [[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]]
			case "W" :
				return [[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,0,1,0]]
			case "X" :
				return [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]]
			case "Y" :
				return [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]]
			case "Z" :
				return [[1,1,1],[0,0,1],[0,1,0],[1,0,0],[1,1,1]]
			case "1" :
				return [[1,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]]
			case "2" :
				return [[1,1,1,0],[0,0,0,1],[0,1,1,0],[1,0,0,0],[1,1,1,1]]
			case "3" :
				return [[1,1,1,0],[0,0,0,1],[0,1,1,0],[0,0,0,1],[1,1,1,0]]
			case "4" :
				return [[1,0,1,0],[1,0,1,0],[1,1,1,1],[0,0,1,0],[0,0,1,0]]
			case "5" :
				return [[1,1,1,1],[1,0,0,0],[1,1,1,0],[0,0,0,1],[1,1,1,0]]
			case "6" :
				return [[0,1,1,0],[1,0,0,0],[1,1,1,0],[1,0,0,1],[0,1,1,0]]
			case "7" :
				return [[1,1,1,1],[0,0,0,1],[0,0,1,0],[0,1,0,0],[0,1,0,0]]
			case "8" :
				return [[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0]]
			case "9" :
				return [[0,1,1,0],[1,0,0,1],[0,1,1,1],[0,0,0,1],[0,1,1,0]]
			case "0" :
				return [[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]]
			case "!" :
				return [[1],[1],[1],[0],[1]]
			case "@" :
				return [[0,1,1,1,0],[1,0,1,0,1],[1,0,1,1,0],[1,0,0,0,0],[0,1,1,1,0]]
			case "#" :
				return [[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0]]
			case "$" ://縦に長いので改変
				return [[0,1,1,1,1],[1,0,1,0,0],[0,1,1,1,0],[0,0,1,0,1],[1,1,1,1,0]]
			case "%" :
				return [[1,1,0,1,0],[1,1,0,1,0],[0,0,1,0,0],[0,1,0,1,1],[0,1,0,1,1]]
			case "^" ://本当は上に1ドットはみ出る
				return [[0,1,0],[1,0,1],[0,0,0],[0,0,0],[0,0,0]]
			case "&" ://本家にはな買った。代わりにユーロ記号っぽいのが。仕方ないので自分でデザイン。
				return [[0,1,1,0,0],[1,0,0,1,0],[0,1,1,0,0],[1,0,1,0,1],[0,1,0,1,0]]
			case "*" :
				return [[0,0,1,0,0],[1,0,1,0,1],[0,1,1,1,0],[1,0,1,0,1],[0,0,1,0,0]]
			case "(" :
				return [[0,1],[1,0],[1,0],[1,0],[0,1]]
			case ")" :
				return [[1,0],[0,1],[0,1],[0,1],[1,0]]
			case "_" ://短くした
				return [[0,0],[0,0],[0,0],[0,0],[1,1]]
			case "-" :
				return [[0,0],[0,0],[1,1],[0,0],[0,0]]
			case "+" :
				return [[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0]]
			case "`" :
				return [[1,0],[0,1],[0,0],[0,0],[0,0]]
			case "~" :
				return [[0,1,0,1],[1,0,1,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
			case "[" :
				return [[1,1],[1,0],[1,0],[1,0],[1,1]]
			case "]" :
				return [[1,1],[0,1],[0,1],[0,1],[1,1]]
			case "\\" :
				return [[1,0,0],[1,0,0],[0,1,0],[0,0,1],[0,0,1]]
			case "{" :
				return [[0,1,1],[0,1,0],[1,0,0],[0,1,0],[0,1,1]]
			case "}" :
				return [[1,1,0],[0,1,0],[0,0,1],[0,1,0],[1,1,0]]
			case "|" ://本当は上下にはみ出す。英文字のアイと区別つかないけど仕方ない
				return [[1],[1],[1],[1],[1]]
			case ";" :
				return [[0,0],[0,1],[0,0],[0,1],[1,0]]
			case ":" :
				return [[0],[1],[0],[1],[0]]
			case "'" :
				return [[1],[1],[0],[0],[0]]
			case "\"" :
				return [[1,0,1],[1,0,1],[0,0,0],[0,0,0],[0,0,0]]
			case "," ://ほんとは下に１dotはみ出す
				return [[0,0],[0,0],[0,0],[0,1],[1,0]]
			case "." :
				return [[0],[0],[0],[0],[1]]
			case "/" :
				return [[0,0,1],[0,0,1],[0,1,0],[1,0,0],[1,0,0]]
			case "<" :
				return [[0,0,1],[0,1,0],[1,0,0],[0,1,0],[0,0,1]]
			case ">" :
				return [[1,0,0],[0,1,0],[0,0,1],[0,1,0],[1,0,0]]
			case "?" :
				return [[1,1,1,0],[0,0,0,1],[0,1,1,0],[0,0,0,0],[0,1,0,0]]
			default :
				return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
		}
	}//getFontDottes()

}//class BigASCII