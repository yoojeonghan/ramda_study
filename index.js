const R = require('ramda');

const array = [0, 1, 2, 3, 4, 5];
const object = { value1: 2, value2: 4, value3: 6, value4: 8 };

/**
 * 1. curry(a, b, c ... )
 * 여러 개의 인자를 가진 함수를 호출할 경우, 파라미터의 수보다 적은 수의 파라미터를 인자로 받으면 누락된 파라미터를 인자로 받는 기법
 * 함수 하나가 n개의 인자를 받는 과정을, n개의 함수로 각각의 인자로 받도록 한다.
 * 부분적으로 적용된 함수를 계속 생성해 결과적으로 값을 처리하도록 하는 것이 본질이다.
 * 함수를 재사용하는데에 유용하게 쓰일 수 있다.
 */

const curry = R.curry((a, b) => {
    return a - b;
});

const curry2 = curry(1);
console.log(`1-1: `, curry2);
console.log(`1-2: `, curry2(2));

/**
 * 2. __ (placeholder)
 * 커리된 함수에서 인수의 순서를 마음대로 바꿔쓸 수 있도록 해주는 데에 유용하다.
 */

const __ = () => {
    return R.__;
}

console.log(`2-1: `, __());
console.log(`2-2: `, curry(1, R.__)(2));
console.log(`2-3: `, curry(R.__, 1)(2));

/**
 * 3. pipe(func a, func b, func c)(a, b ...)
 * 함수 여러개를 결합해서 새로운 함수를 정의할 수 있도록 해주는 함수. 위에서부터 밑으로 진행된다. (compose는 밑에서부터 위로 진행된다.)
 */

const pipe = R.pipe(
    curry,
    Math.sqrt,
    Math.floor
);

console.log(`3-1: `, pipe(5, 2));

/**
 * 4. map(func a, b)
 * 지정한 함수를 콜렉션의 모든 원소에 각각 적용하여 새로운 콜렉션을 생성한다.
 */

const increment = (x) => x + 1; 
const map = R.map(increment, array);
console.log(`4-1: `, map);


/**
 * 5. apply(func a, b)
 * func a가 매개변수로 배열 b를 받을 때 사용한다.
 * 하나의 함수를 인자 각각에 적용하는 것이 아니라, 배열 b 자체를 func a에 매개변수로 전달한다.
 */

const apply = R.apply(Math.max, array);
console.log(`5-1: `, apply);

/**
 * 6. reduce(func a, b, c)
 * c 콜렉션의 모든 원소를 func a를 통하여 b에 하나의 값으로 축약한다.
 * func a는 사용되는 함수, b는 초기값, c는 대상 콜렉션.
 */

// x에 초기값 b가 들어가고 y에 콜렉션 c의 요소가 들어가는 듯 하다.
const overwrite = (x, y) => x + y;
const reduce = R.reduce(overwrite, 0, array);
console.log(`6-1: `, reduce);


/**
 * 7. sum(a)
 * 콜렉션 a의 합계를 구한다.
 */

const sum = R.sum(array);
console.log(`7-1: `, sum);


/**
 * 8.nth(a, b)
 * 콜렉션 b의 a번째 원소를 참조한다.
 * object의 경우 a키에 있는 값을 참조한다.
 */

const nth = R.nth(2, array);
console.log(`8-1: `, nth);

const nth2 = R.nth('value1', object);
console.log(`8-2: `, nth2);

/**
 * 9. prop(a, b)
 * object의 a키 참조하여 반환한다.
 * 배열이 아닌 object형일 경우 nth가 아니라 prop을 사용하는 것이 좋을 것 같다.
 * nth와 마찬가지로 배열에도 사용이 가능한 것 같다.
 */

const prop = R.prop('value1', object);
console.log(`9-1: `, prop);

const prop2 = R.prop(0, array);
console.log(`9-2: `, prop2);

/**
 * 10. range(a, b)
 * a부터 b-1까지의 수열을 생성한다.
 */

const range = R.range(0, 10);
console.log(`10-1 :`, range);


/**
 * 11. repeat(a, b)
 * a를 b개 담은 배열을 생성한다.
 */

const repeat = R.repeat({test: 1, test: 2}, 5);
console.log(`11-1 :`, repeat);

const repeat2 = R.repeat(R.repeat([], 3), 5);
console.log(`11-2: `, repeat2);

/**
 * 12. filter(func a, b)
 * 콜렉션 b에서 a 조건 함수를 만족하는 요소만을 남긴다.
 */

const filter = R.filter((x) => x % 2 == 0, array);
console.log(`12-1 :`, filter);

/**
 * 13. sort(func a, b)
 * 두 인자의 차를 구하는 func a를 선언해 b를 정렬한다.
 */

const sortTestArray = R.range(0, 10).sort(() => { return 0.5 - Math.random() });
const sort = R.sort((a, b) => a - b, sortTestArray);
console.log(`13-1 :`, sort);

/**
 * 14. reverse(a)
 * 콜렉션 a 또는 문자열 a의 순서를 뒤집는다.
 */

const reverse = R.reverse(sort);
console.log(`14-1 :`, reverse);

/**
 * 15. concat(a, b)
 * 콜렉션 또는 문자열인 a와 b를 연결한다.
 * 콜렉션과 문자열은 연결할 수 없다.
 */

const concat = R.concat([1,2], [3,4,5]);
console.log(`15-1 :`, concat);

const concat2 = R.concat('1,2,', '3,4,5');
console.log(`15-2 :`, concat2);

/**
 * 16. append(a, b)
 * 콜렉션 b의 맨 뒤에 a 원소를 추가한 함수를 반환한다.
 */

const append = R.append(5, [1,2,3,4]);
console.log(`16-1 :`, append);

/**
 * 17. prepend(a, b)
 * 콜렉션 b의 맨 앞에 a 원소를 추가한 함수를 반환한다.
 */

const prepend = R.prepend(5, [1,2,3,4]);
console.log(`17-1 :`, prepend);

/**
 * 18. head(a)
 * 콜렉션에서 첫 번째 원소를 취한다. object는 사용 불가.
 */

const head = R.head(array);
console.log(`18-1 :`, head);

/**
 * 19. take(a, b)
 * 콜렉션 b에서 처음부터 a개의 원소를 취한 콜렉션을 구한다.
 * 뒤에서부터 하고 싶으면 takeLast(a, b).
 * 두 경우 모두 기존 배열의 인덱스 순서대로 나옴.
 */

const take = R.take(3, [1,2,3,4,5]);
console.log(`19-1: `, take);

const take2 = R.takeLast(3, [1,2,3,4,5]);
console.log(`19-2: `, take2);

/**
 * 20. drop(a, b)
 * b에서 처음부터 a개의 원소를 제거한 콜렉션을 반환한다.
 * 뒤에서부터 제거하고 싶으면 dropLast(a, b).
 */

const drop = R.drop(3, [1,2,3,4,5]);
console.log(`20-1: `, drop);

const drop2 = R.dropLast(3, [1,2,3,4,5]);
console.log(`20-2: `, drop2);

/**
 * 21. slice(a, b, c)
 * 콜렉션 c의 원소를 범위를 지정해 잘라낸다.
 * Infinity를 쓰면 끝까지 잘라낸다.
 * 원본 배열은 변경되지 않는다.
 */

const sliceArray = [1,2,3,4,5];
const slice = R.slice(0, 1, sliceArray);
console.log(`21-1: `, slice, sliceArray);

/**
 * 22. assoc(a, b, c)
 * c 객체의 a키의 값을 b로 갱신한다.
 */

const assocObject = { key1: 'value1' };
const assoc1 = R.assoc('key1', 'value2', assocObject);
console.log(`22-1: `, assoc1);

const assoc2 = R.assoc('key2', 'value2', assocObject);
console.log(`22-2: `, assoc2);

/**
 * 23. dissoc(a, b)
 * b 객체의 a키를 제거한다.
 */

const dissoc = R.dissoc('key2', assoc2);
console.log(`23-1 :`, dissoc);

/**
 * 24. union(a, b)
 * 두 배열의 합집합을 구한다. object형식의 요소도 판정이 되는듯.
 */

const union = R.union([1,2,3], [3,4,5]);
console.log(`24-1 :`, union);

const union2 = R.union([{key: 1, key2 : 1}], [{key: 1, key2 : 1}, {key2 : 1, key3: 1}]);
console.log(`24-2 :`, union2);

/**
 * 25. intersection(a, b)
 * 두 배열의 교집합을 구한다. object형식의 요소도 판정이 되는듯.
 */

const intersection = R.intersection([1,2,3], [3,4,5]);
console.log(`25-1 :`, intersection);

const intersection2 = R.intersection([{key: 1, key2 : 1}], [{key: 1, key2 : 1}, {key2 : 1, key3: 1}]);
console.log(`25-2 :`, intersection2);

/**
 * 26. difference(a, b)
 * a 배열로부터 b 배열의 차집합을 구한다. object형식의 요소도 판정이 되는듯.
 */

const difference = R.difference([1,2,3], [3,4,5]);
console.log(`26-1 :`, difference);

const difference2 = R.difference([3,4,5,6], [6]);
console.log(`26-2 :`, difference2);

/**
 * 27. is(a, b)
 * 객체 b가 생성자 a의 인스턴스인지 검사하는 함수.
 */

console.log(`27-1 :`, R.is(Number, 1));
console.log(`27-2 :`, R.is(String, 'string'));
console.log(`27-3 :`, R.is(String, 1));

/**
 * 28. complement(func a)
 * a 함수의 논리 결과의 반대를 반환하는 함수.
 */

const complementTest = x => x < 0;
console.log(`28-1 :`, R.complement(complementTest)(1));

/**
 * 29. all(func a, b)
 * 컬렉션 b의 모든 요소가 조건함수 a의 조건을 만족하는지 검사하는 함수.
 */

const allTestArray = [1,2,3,4,'string'];
const allTestFunc = x => R.is(Number, x);

console.log(`29-1 :`, R.all(allTestFunc, allTestArray));
console.log(`29-2 :`, R.all(allTestFunc, R.dropLast(1, allTestArray)));

/**
 * 30. any(func a, b)
 * 컬렉션 b의 요소가 하나라도 조건함수 a의 조건을 만족하는지 검사하는 함수.
 */

let anyTestArray = [1,2,3,4,'string'];
const anyTestFunc = x => R.is(String, x);
console.log(`30-1 :`, R.any(anyTestFunc, allTestArray));

anyTestArray = R.dropLast(1, anyTestArray);
console.log(`30-2 :`, R.any(anyTestFunc, anyTestArray));

const anyTestArray2 = [1,2,3,4,'string'];
console.log(`30-3 :`, R.pipe(
    R.dropLast(1),
    R.any(x => R.is(String, x)),
)(anyTestArray2));

/**
 * 31. T(), F()
 * T는 언제나 true를, F는 언제나 false를 반환한다.
 */

console.log(`31-1 :`, R.T());
console.log(`31-2 :`, R.F());

const TFTestArray = R.map(R.objOf('number'), R.range(0, 10));
const TF = R.map(R.pipe(
    R.prop('number'),
    R.ifElse(
        (x) => x % 2 == 0,
        R.T,
        R.F,
    )
), TFTestArray);

console.log(`31-3 :`, TF);

/**
 * 32. always(a)
 * 항상 a를 반환하는 함수를 만든다.
 */

const always = R.map(R.pipe(
    R.ifElse(
        (x) => x == true,
        R.always('홀수'),
        R.always('짝수')
    )
), TF)

console.log(`32-1 :`, always);

/**
 * 33. cond([[func a, func b], [func c, func d], [func e, func f]...])
 * 다중 if/else문을 묶어 표현하는 함수.
 * func a의 조건을 만족할 경우 func b, func c의 조건을 만족할 경우 func d ... 이런 식으로 진행된다.
 */

const between = R.curry((from, to, target) => from <= target && target <= to);
const monthArray = R.range(1, 14);

const cond = R.cond([
    [between(1, 3), R.always('봄')],
    [between(4, 6), R.always('여름')],
    [between(7, 9), R.always('가을')],
    [between(10, 12), R.always('겨울')],
    [R.T, R.always('흠...')]
]);

const cond2 = R.map(cond, monthArray);
console.log(`33-1 :`, cond2);

/**
 * 34. equals(a, b)
 * a와 b가 같은지 여부를 판정하는 함수.
 */

const equals = R.map(R.pipe(
    R.ifElse(
        R.equals(true),
        R.always('짝수'),
        R.always('홀수')
    )
), TF)

console.log(`34-1 :`, equals);

/**
 * 35. andThen(func a)
 * pipe 내부에서 비동기적인 리턴값을 받은 뒤, 내부의 함수 a를 실행한다.
 */

const promiseFuc = () => { return new Promise( (resolve) => resolve(1)) };

async function a() {
    await R.pipe(
        promiseFuc,
        //(x => console.log(`35-1 :`, x)),
    )();
    await R.pipe(
        promiseFuc,
        //R.andThen(x => console.log(`35-2 :`, x)),
    )();
}

a();

/**
 * 36. either(func a, func b, c)
 * c가 조건함수 a 또는 b를 만족하는지 여부를 판단하는 함수.
 */

const eitherTest1 = x => x > 10;
const eitherTest2 = x => Number.isInteger(x);
const either = R.either(eitherTest1, eitherTest2);

console.log(`36-1 :`, either(10));
console.log(`36-2 :`, either(11.1));
console.log(`36-3 :`, either(9.1));

/**
 * 37. gte(a, b)
 * a가 b보다 같거나 크면 true, 아니면 false를 반환한다.
 */

console.log(`37-1: `, R.gte(1, 2));
console.log(`37-2: `, R.gte(2, 2));
console.log(`37-3: `, R.gte(3, 2));
console.log(`37-4: `, R.gte('a', 'b'));
console.log(`37-5: `, R.gte('b', 'b'));
console.log(`37-6: `, R.gte('c', 'b'));

/**
 * 38. lte(a, b)
 * a가 b보다 작거나 같으면 true, 아니면 false를 반환한다.
 */

console.log(`38-1: `, R.lte(1, 2));
console.log(`38-2: `, R.lte(2, 2));
console.log(`38-3: `, R.lte(3, 2));
console.log(`38-4: `, R.lte('a', 'b'));
console.log(`38-5: `, R.lte('b', 'b'));
console.log(`38-6: `, R.lte('c', 'b'));

/**
 * 39. toPairs(a)
 * {key: value} 형태의 오브젝트 a를 [key, value]의 형식으로 변환한다.
 * (객체의 순서가 보장되지 않는다)
 */

const pairsObject = {1:2, 3:4, 5:6};
console.log(`39-1: `, R.toPairs(pairsObject));

/**
 * 40. fromPairs(a)
 * [key, value] 형식의 배열을 {key: value} 형태의 오브젝트로 변환한다.
 */

const pairsArray = [[1,2], [3,4], [5,6,7]];
console.log(`40-1: `, R.fromPairs(pairsArray));

/**
 * 41. identity(a)
 * a를 반환한다.
 */

console.log(`41-1 :`, R.identity(1));

/**
 * 42. useWith(func a, [func b, func c])(d, e)
 * 함수 b에 d를, 함수 c에 e를 적용한 결과값을 함수 a에 적용한다.
 */

const useWith = R.useWith(R.mergeLeft, [R.objOf('number'), R.objOf('type')]);
console.log(`42-1 :`, useWith(1, 2));

const useWithTestObj = { 1:2, 3:4, 5:6, 7:8 };
const useWith2 = R.useWith(R.mergeLeft, [R.objOf('number'), R.objOf('type')]);
console.log(`42-2 :`, R.map(R.apply(useWith2), R.toPairs(useWithTestObj)));

/**
 * 43. clamp(a, b, c)
 * c가 a와 b의 범위를 넘어가면 a 또는 b를, 그렇지 않으면 c를 반환한다.
 */

const clamp = R.clamp(1,2,3);
console.log(`43-1 :`, clamp);

const clamp2 = R.clamp(1,10,3);
console.log(`43-2 :`, clamp2);

/**
 * 44. invoker(a,b)(c,d,e...)(f)
 * f 클래스 내부의 b 이름의 함수를 호출한다. 매개변수의 개수는 a개이며, c,d,e...는 매개변수이다.
 */

class invokerClass {
    testfunc1(c) {
        return 'testfunc1-' + c;
    }
    testfunc2(c,d,e) {
        return 'testfunc2-' + c + d + e;
    }
}

const invokertestObj = new invokerClass();
console.log(`44-1 :`, R.invoker(1, 'testfunc1')(1)(invokertestObj));
console.log(`44-2 :`, R.invoker(3, 'testfunc2')(1,2,3)(invokertestObj));

/**
 * 45. isNil
 * 
 */

/**
 * 46. path
 * 
 */

/**
 * split
 * it
 * defaultTo
 * inc
 * forEachObjindexed
 * add
 * clone
 * isEmpty
 * pickAll
 * view
 * substract
 * divide
 * flatten
 * of
 * values,
 * mapObjIndexed
 * both
 * is
 * 
 */