let line= ""
let width= 8
let height=8
for (let i=0; i<height; i++){
  for (let j=0; j<width; j++){
    if ((i%2 ==0 & j%2==0) || (i%2==1 & j%2==1)){
    line = line+" "
    } else {
    line= line+"#"
    }
  }
    line= line+ "\n"
}
console.log(line);
