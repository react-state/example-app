import * as React from "react";
import { Store, FormStateManager, CustomFormElement, CustomFormElementProps, ElementValueChangeEvent, FormElement } from "react-state-rxjs";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export class FormsComponent extends React.Component<any, any> {

    private form = React.createRef<HTMLFormElement>();
    private customFormElement = React.createRef<ComplexFormElementComponent>();

    private formStateManager: FormStateManager;
    private location: string;
    private unsubscribe = new Subject<any>();

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        Store.store.select(['form', 'location'])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(location => {
                this.location = location;
            })

        this.formStateManager = Store.store.select(['form']).form
            .bind(this.form.current)
            .addCustomFormElements([this.customFormElement.current])
            .shouldUpdateState((form: HTMLFormElement, formElements: FormElement[], target: HTMLElement | CustomFormElement, state: any) => true)
            .onChange(state => this.forceUpdate())
            .sync();
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillUnmount() {
        this.formStateManager.destroy();
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }

    handleSubmit(event) {
        alert(this.form.current.files[0].name)
        event.preventDefault();
    }

    reset() {
        this.formStateManager.reset();
    }

    render() {
        return (
            <div>
                <button style={{ marginBottom: '15px' }} onClick={this.reset}>Reset</button><br /><br />

                Selected location: {this.location}<br /><br />

                <form onSubmit={this.handleSubmit} ref={this.form}>
                    <section>
                        <h6>Car Condition:</h6>
                        <p><input type="checkbox" form-element-name="new" form-group-name="condition" /> New</p>
                        <p><input type="checkbox" form-element-name="used" form-group-name="condition" /> Used</p>
                        <p><input type="checkbox" form-element-name="notSpecified" form-group-name="condition" /> Not specified</p>
                    </section>

                    <hr />
                    <section>
                        <h6>Car location:</h6>
                        <p><input type="radio" value="usa" name="location" /> USA</p>
                        <p><input type="radio" value="europe" name="location" /> Europe</p>
                        <p><input type="radio" value="asia" name="location" /> Asia specified</p>
                    </section>

                    <hr />
                    <section>
                        <h6>Car model:</h6>
                        <select multiple name="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </section>

                    <hr />
                    <section>
                        <h6>Car color:</h6>
                        <select name="color">
                            <option value="red">Red</option>
                            <option value="white">White</option>
                            <option value="blue">Blue</option>
                            <option value="orange">Orange</option>
                        </select>
                    </section>

                    <hr />
                    <section>
                        <h6>Car description:</h6>
                        <textarea name="description"></textarea>
                    </section>

                    <hr />
                    <section>
                        <h6>Owner address:</h6>
                        <input type="text" name="address" />
                    </section>

                    <hr />
                    <section>
                        <h6>Complex custom form element:</h6>
                        <ComplexFormElementComponent
                            ref={this.customFormElement}
                            form-element-name="complexElement"
                            form-group-name="group">
                        </ComplexFormElementComponent>
                    </section>

                    <hr />
                    <p><input type="file" name="other-documents" /></p>

                    <hr />
                    <p><input type="submit" value="Submit" /></p>
                </form>
            </div>
        )
    }
}

export class ComplexFormElementComponent extends React.Component<CustomFormElementProps, any> implements CustomFormElement {

    private inputElement = React.createRef<HTMLInputElement>()
    private takeUntil = new Subject<any>();

    onElementValueChange = new Subject<ElementValueChangeEvent>();
    onStateValueChange = new Subject<any>();

    complexElement: string;

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.listenToStateChange();
    }

    componentDidMount() {
        Store.store.select(['form', 'group', 'complexElement'])
            .subscribe(complexElement => {
                this.complexElement = complexElement;
            })
    }

    componentWillUnmount() {
        this.takeUntil.next();
        this.takeUntil.unsubscribe();
    }

    listenToStateChange() {
        this.onStateValueChange
            .pipe(takeUntil(this.takeUntil))
            .subscribe(state => {
                this.inputElement.current.value = state;
            });
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.onElementValueChange.next({
            target: this,
            value: event.target.value
        });

        event.stopPropagation();
    }

    render() {
        return (
            <div>
                Selected value: {this.complexElement}<br /><br />
                <input type="text" form-ignore="true" ref={this.inputElement} onChange={this.handleChange} />
            </div>
        );
    }
}