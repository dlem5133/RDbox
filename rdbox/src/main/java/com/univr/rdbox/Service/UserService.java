package com.univr.rdbox.Service;

import java.util.List;

import com.univr.rdbox.dao.*;
import com.univr.rdbox.model.Item;
import com.univr.rdbox.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // 로그인시
    @Autowired
    private UserDao userDao;

    @Autowired
    private ItemDao itemDao;

    public int login(String id) {
        try {
            User user = userDao.findByKakaoid(id);
            if (user.getItem().equals("x")) {
                return 1;
            }
            if(user==null)
                return 0;
            return 2;
        } catch (Exception e) {
            return 0;
        }

    };
    //

    public void join(String id, String nickname,String token) {
        User user = new User();
        user.setKakaoid(id);
        user.setNickname(nickname);
        user.setItem("x");
        user.setIsdraw(0);
        user.setToken(token);
        System.out.println(user);
        userDao.save(user);
    };

    public String check(String id) {
        User user = userDao.findByKakaoid(id);
        if (user.getItem().equals("x")) {
            List<Item> itemList = itemDao.findAll();
            int all_num = 0;
            for (int i = 0; i < itemList.size(); i++) {
                all_num += itemList.get(i).getCnt();
            }
            if(all_num==0) 
                return "none";
            String ret="";
            int ran = (int) (Math.random() * 10000)%all_num;
            System.out.println(ran);
            for (int i = 0; i < itemList.size(); i++) {
                Item temp = itemList.get(i);
                if(ran-temp.getCnt()<0){
                    ret = temp.getName();
                    temp.setCnt(temp.getCnt()-1);
                    itemDao.save(temp);
                    user.setItem(ret);
                    userDao.save(user);
                    break;
                }
                else{
                    ran-=temp.getCnt();
                }
            }
            return ret;
        }
        return user.getItem();
    }
    public User info(String id){
        return userDao.findByKakaoid(id);
    }
    public List<Item> itemlist() {
        return itemDao.findAll();
    };
}
