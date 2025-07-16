const element = document.getElementById('signUp')
element.addEventListener('click', function() {
    const input1 = document.querySelector('#id').value;
    const input2 = document.querySelector('#password').value;
    const input3 = document.querySelector('#password2').value;
    if (input2 !== input3) {
        alert('비밀번호 확인이 다릅니다!')
    }else{
        fetch
    }
});
