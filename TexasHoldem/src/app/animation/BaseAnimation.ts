/**
 * 动画基类
 */
abstract class BaseAnimation<T> implements IAnimationHandler<T> {
	public target: T;
	public setTarget(target: T)
	{
		this.target = target;
	}
	public reset()
	{
		this.clear();
	}
	public run(...args)
	{
		this.reset();
	}
	public runOver()
	{	
		this.clear();
	}
	public clear()
	{
		egret.Tween.removeTweens(this.target);
	}
}