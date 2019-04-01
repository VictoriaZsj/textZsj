var gulp = require('gulp');
var concat = require('gulp-concat');

const LIB_NAME_LIST = ['jszip','BigInteger','sproto','base64','aes','hmacsha1','pakdh-client', 'particle'];//第三方扩展库

function getPathList(suffix)
{
    var list = [];
    for (var i=0;i<LIB_NAME_LIST.length;i++)
    {
        list.push('../libsrc/'+LIB_NAME_LIST[i]+'/bin/'+LIB_NAME_LIST[i]+'/'+LIB_NAME_LIST[i]+suffix);
    }
    return list;
}

// task

gulp.task('concat-js',function()
{
    var list = getPathList('.js');
    return gulp.src(list).pipe(concat('bundle.js')).pipe(gulp.dest('libs/bundle'));
});
gulp.task('concat-min-js',function()
{
    var list = getPathList('.min.js');
    return gulp.src(list).pipe(concat('bundle.min.js')).pipe(gulp.dest('libs/bundle'));
});
gulp.task('copy-ts',function()
{
    var list = getPathList('.d.ts');
    return gulp.src(list).pipe(concat('bundle.d.ts')).pipe(gulp.dest('libs/bundle'));
});

gulp.task('default',['concat-js','concat-min-js','copy-ts']);