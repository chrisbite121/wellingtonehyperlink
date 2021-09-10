import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class wellingtonehyperlink implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _container: HTMLDivElement;
	private _hyperlinkContainer: HTMLDivElement;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		var _divrow = document.createElement('div');
		_divrow.id = "wellingtoneiconrow";
		_divrow.className = "row";

		this._hyperlinkContainer = document.createElement('div');
		this._hyperlinkContainer.id = "wellingtonehyperlinkcontainer";
		this._hyperlinkContainer.className = "columnhyperlink";
		
		_divrow.appendChild(this._hyperlinkContainer);
		
		this._container = document.createElement('div');
		container.appendChild(this._container);
		this._container.appendChild(_divrow);

		this.renderControl(context);
	}
	
	private renderControl(context: ComponentFramework.Context<IInputs>)
	{
		this._hyperlinkContainer.innerHTML = "";

		let _hyperlink = document.createElement('a');
		_hyperlink.id = "wellingtonehyperlink";

		let _hyperlinkValue = '';
		if(context.parameters.urlvalue?.raw !== null)
			_hyperlinkValue = context.parameters.urlvalue?.raw;

		_hyperlink.href = _hyperlinkValue;

		let _displayValue = '';
		if(context.parameters.displayvalue?.raw !== null)
			_displayValue = context.parameters.displayvalue?.raw;

		_hyperlink.innerText = _displayValue;
		_hyperlink.title = _displayValue;
		
		_hyperlink.setAttribute("target", "_blank");

		let _ul = document.createElement('ul');
		let _li = document.createElement('li');

		//li and ul required for styling of hyperlink, see css
		_li.appendChild(_hyperlink)
		_ul.appendChild(_li)

		var root = document.querySelector(':root');

		let _hoverColour = context.parameters.hovercolour?.raw
		if(root && _hoverColour){
			var rootStyles = getComputedStyle(root as any);
			//var hovColour= rootStyles.getPropertyValue('--hovColour');
			(<any>root).style.setProperty('--wellHyperlinkHovColour', _hoverColour);
		}

		this._hyperlinkContainer.appendChild(_ul);
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.renderControl(context);
		// Add code to update control view
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

}
