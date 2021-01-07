package com.univr.rdbox.controller;


import java.util.HashMap;
import java.util.List;

import com.univr.rdbox.Service.UserService;
import com.univr.rdbox.dao.UserDao;
import com.univr.rdbox.model.Item;
import com.univr.rdbox.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	@PostMapping(value = "/info")
	public ResponseEntity<?> info(@RequestParam String id) {
		System.out.println("info Controller");
		try {
			// id 가 db에 없다면 닉네임 입력
			User user = userService.info(id);
			
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

	}
	@PostMapping(value = "/login")
	@ApiOperation(value = "로그인 (DB에 없으면 회원가입)")
	public ResponseEntity<?> login(@RequestParam String id) {
		System.out.println("login Controller");
		try {
			// id 가 db에 없다면 닉네임 입력
			int ret = userService.login(id);
			System.out.println(ret);
			return new ResponseEntity<>(ret, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

	}
	//가입
	@PostMapping(value = "/join")
	public ResponseEntity<?> join(@RequestParam String id,@RequestParam String nickname,@RequestParam String token) {
		System.out.println("join Controller");
		try {
			userService.join(id, nickname,token);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

	}

	// RandomBox Open
	@PostMapping(value = "/open")
	public ResponseEntity<?> RandomBoxOpen(@RequestParam String id) {
		System.out.println("RandomBox Open");
		try {
			String ret = userService.check(id);
			List<Item> list = userService.itemlist();
			HashMap<String,Object> map = new HashMap<>();
			map.put("list", list);
			map.put("result",ret);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

	}

	//남은 경품
	@PostMapping(value = "/list")
	public ResponseEntity<?> list() {
		System.out.println("list Controller");
		try {
			List<Item> list = userService.itemlist();
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

	}
	


}
