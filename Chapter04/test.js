
// 4.3 첫 번째 테스트

describe('province', function(){
    it('shortfail', function(){
        // 1. 픽스처 설정
        const asia = new Province(sampleProvinceData());
        // 2. 검증
        assert.equal(asia.shortfail, 5);
    });
});


/**
 * 모카 프레임워크는 테스트 코드를 블록 단위로 나눠서 각 블록에 테스트 스위트를 
 * 담는 구조다. 테스트는 it 블록에 담긴다. 앞의 예에서는 테스트를 두 단계로 진행했다.
 * 1. 첫 번째 단계에서는 테스트에 필요한 데이터와 객체를 뜻하는 픽스처를 설정한다.
 * 이 예시에서는 샘플 지역 정보로부터 생성한 Province 객체를 픽스처로 설정했다.
 * 2. 두 번째 단계에서는 이 픽스처의 속성들을 검증하는데, 여기서는 주어진 초깃값에 기초하여
 * 생산 부족분을 정확히 계산했는지 확인한다.
 * 
*/

// #####################################
// 모카 프레임워크는 소위 어서션 라이브러리라고 하는 픽스처 검증 라이브러리를 선택해 사용할 수 있다.
// 이 책에서는 차이 라이브러리를 사용하겠다.

describe('province', function(){
    it('shortfail', function(){
        // 1. 픽스처 설정
        const asia = new Province(sampleProvinceData());
        // 2. 검증
        assert.equal(asia.shortfail, 5);
    });
});


describe('province', function(){
    it('shortfail', function(){
        // 1. 픽스처 설정
        const asia = new Province(sampleProvinceData());
        // 2. 검증
        expect(asia.shortfail).equal(5);
    });
});

// 4.4 테스트 추가하기

describe('province', function(){
    it('shortfail', function(){
        // 1. 픽스처 설정
        const asia = new Province(sampleProvinceData());
        // 2. 검증
        expect(asia.shortfail).equal(5);
    });
    it('profit', function(){
        const asia = new Province(sampleProvinceData());
        expect(asia.profit).equal(230);
    });
});





