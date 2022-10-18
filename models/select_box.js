async function gen_box() {
    let box_string =
        `<label for="cars">Choose a shop:</label>
            <select name="cars" id="shop_id">
                <option value="1">Shop 1</option>
                <option value="2">Shop 2</option>
                <option value="3">Shop 3</option>
            <option value="0" selected>All shops</option>
        </select> `;
    return box_string;
}

module.exports = gen_box;