const functions = require('./functions');

//Passing test
test('Adds 2 + 2 to equal 4', () => {
    expect(functions.add(2, 2)).toBe(4);
})

//Failing test
test('Adds 2 + 2 to NOT equal 5', () => {
    expect(functions.add(2, 2)).not.toBe(5);
})

// CHECK FOR TRUTHY & FALSY VALUES
// toBeNull matches only null
// toBeUndefined matches only undefined
// toBeDefined is the opposite of toBeUndefined
// toBeTruthy matches anything that an if statement treats as true
// toBeFalsy matches anything that an if statement treats as false

//to be Null
test('Should be null', () => {
    expect(functions.isNull()).toBeNull();
})

//to be Falsy
test('Should be falsy', () => {
    expect(functions.checkValue(0)).toBeFalsy();
})

//** toEqual is used to compare reference variables as to toBe is used to compare instance variables or primative variables
test('User should be Wonjae Sung object', () => {
    expect(functions.createUser()).toEqual({
        firstName: 'Wonjae',
        lastName: 'Sung'
    });
})

//less than or greater than
test('should be under 1600', () => {
    const load1 = 800;
    const load2 = 700;
    expect(load1 + load2).toBeLessThan(1600);
})

//Regex, not case sensitive. if you want it to be case sensitive, you need to put /I/i
test('There is no I in team', () => {
    expect('team').not.toMatch(/I/);
})

//Arrays
test('admin should be in usernames', () => {
    usernames = ['john', 'karen', 'admin']
    expect(usernames).toContain('admin')
})

//Working with asnyc data
test('User fetched name should be Leanne Graham', () => {
    expect.assertions(1);
    return functions.fetchUser().then(data=>{
    expect(data.name).toEqual('Leanne Graham');
    });
});

//Working with asnyc data
// test('User fetched name should be Leanne Graham', async () => {
//     expect.assertions(1);
//     const data = await functions.fetchUser();
//     expect(data.name).toEqual('Leanne Graham');
// });f