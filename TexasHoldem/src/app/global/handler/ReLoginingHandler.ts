class ReLoginingHandler
{
    public invoke():void
    {
        SocketManager.Dispose();
        UserManager.reLogin();
        ShoppingManager.clearList();
    } 
}