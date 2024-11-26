    // We write everything inside an immediately executed function to avoid leaking anything to the global scope.
// import { Component, xml, mount} from "owl"
const { Component, mount, xml, useRef, onMounted } = owl;

// This is the sub component Task
class Task extends Component {
    static template=xml`
        <div class="task">
        <input type="checkbox" t-att-class="props.task.isCompleted ? 'done' : ''" />
        <span><t t-esc='props.task.text' /></span>
        </div>
    `;
    
    // static prop key
    // the Task component has a props key: this is only useful for validation purpose. It says that each Task should be given exactly one prop, named task. If this is not the case, Owl will throw an error. This is extremely useful when refactoring components
    static props = ["task"]

}

// owl components --> This is the root component.
class Root extends Component {
    static template = xml`
        <div class="task-items">TASK ITEMS</div>
        <div class="todo-app">

            <input
                type="text"
                placeholder="Enter a new task"
                t-on-keyup="addTask"
                t-ref="add-input"
            />
            <div class="task-list">
                <t t-foreach="tasks" t-as="task" t-key="task.id">
                    <Task task="task" />
                </t>
            </div>
        </div>
        
    `
    // static component key. WHen a subcomponent is defined then it is added in static components key so Owl can get a reference to it.
    static components = { Task }
    
    // This will be triggered when we press and release enter (keyCode: 13)
    addTask(e){
        if(e.key==="Enter"){
            // Trim whitespace
            const text = e.target.value.trim();
            if(text){
                this.tasks.push({
                    id: this.tasks.length+1,// uID
                    text: text,
                    isCompleted: false,
                });
                // clear input field
                e.target.value="";
            }
        }
    }

    setup(){
        // references to input element
        const inputRef = useRef("add-input")

        // focus input on mount
        onMounted(()=> inputRef.el.focus())
    }

    tasks = [
        {
            id: 1,
            text: "buy milk",
            isCompleted: true,
        },
        {
            id: 2,
            text: "clean house",
            isCompleted: false
        },
        {
            id: 3,
            text: "doing exercise",
            isCompleted: false
        },
        {
            id: 4,
            text: "doing homework",
            isCompleted: true
        }
    ]
    
}

// ...ANOTHER WAY...
// class App extends Component {}
// App.template = xml`<div>todo app</div>`;
// mount(App, document.body);


mount(Root, document.body, {dev: true}) // Mount the root to document.body
// we define a component with an inline template, then mount it in the document body.

  
