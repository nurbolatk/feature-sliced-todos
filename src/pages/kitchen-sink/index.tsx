import * as React from 'react'
import {Checkbox} from "shared/ui/checkbox";
import './styles.scss'

const KitchenSinkPage = (): JSX.Element => {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const entires = Array.from(formData.entries())
        console.log(entires)
        e.currentTarget.reset()
    }

    return <div style={{
        height: '100vh',
        // background: 'tomato'
    }}>
        <h2>Forms</h2>
        <h5>Checkbox</h5>
        <form onSubmit={handleSubmit}>
            <input type="text" value="hi there" name="title"/>
            <div>
                <label htmlFor="checkbox" className="form-control">
                    <Checkbox id="checkbox" name="completed"/>
                    Check me!
                </label>
            </div>
            <button>Submit</button>
        </form>
    </div>
}

export default KitchenSinkPage